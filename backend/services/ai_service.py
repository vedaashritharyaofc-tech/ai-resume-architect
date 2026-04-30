import json
import httpx

# HARDCODED KEY FOR TESTING (Replace this string with your actual key!)
API_KEY = "AIzaSyCsTIrtvcKmF9fxl0HBV4rLGAu38WSt6sQ"

# We talk to the API directly to completely avoid the deprecated Google SDK!
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

async def generate_from_gemini(prompt: str) -> str:
    """Helper function to make direct HTTP requests to Gemini"""
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.7}
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(GEMINI_URL, json=payload, timeout=60.0)
        
        if response.status_code != 200:
            raise Exception(f"Gemini API Error: {response.text}")
            
        data = response.json()
        return data["candidates"][0]["content"]["parts"][0]["text"]

async def generate_resume(user_data: dict, target_role: str) -> str:
    prompt = f"""
    You are an expert technical resume writer. Generate a highly professional resume in HTML format for the following candidate.
    
    Target Role: {target_role}
    
    Candidate Data:
    - Name: {user_data.get('name', 'N/A')}
    - Email: {user_data.get('email', 'N/A')}
    - Phone: {user_data.get('phone', 'N/A')}
    - Skills: {user_data.get('skills', 'N/A')}
    - Experience: {user_data.get('experience', 'N/A')}
    - Education: {user_data.get('education', 'N/A')}
    - Projects: {user_data.get('projects', 'N/A')}

    Instructions:
    - Return ONLY valid HTML code. Do not include markdown formatting like ```html.
    - Use clean, semantic HTML. 
    - Include a clean Header (Name, Contact Info), Summary (tailored to {target_role}), Skills, Experience, Projects, and Education sections.
    - Make the content sound professional, impactful, and action-oriented.
    """
    
    html_content = await generate_from_gemini(prompt)
    return html_content.replace("```html", "").replace("```", "").strip()


async def optimize_resume(resume_html: str, job_description: str) -> str:
    prompt = f"""
    You are an expert ATS (Applicant Tracking System) optimizer. I will provide an existing resume in HTML format and a target job description.
    Your task is to optimize the resume's text to better match the job description, highlighting relevant skills and experiences using the exact keywords from the job description.
    
    Keep the exact same HTML structure and tags. ONLY rewrite and enhance the text content to score higher on an ATS for this specific job.

    Job Description:
    {job_description}

    Current Resume HTML:
    {resume_html}

    Instructions:
    - Return ONLY the updated HTML code. Do not include markdown formatting like ```html.
    - Do not change the underlying HTML structure, just improve the text inside the tags.
    """
    
    html_content = await generate_from_gemini(prompt)
    return html_content.replace("```html", "").replace("```", "").strip()


async def score_resume(resume_html: str, target_role: str) -> dict:
    prompt = f"""
    You are an expert ATS (Applicant Tracking System). Evaluate the following resume HTML for the role of {target_role}.
    
    Return ONLY a JSON object with the following structure:
    {{
        "score": <number 0-100>,
        "feedback": "<string with a short overall evaluation>",
        "improvements": ["<specific tip 1>", "<specific tip 2>", "<specific tip 3>"]
    }}
    
    Resume HTML:
    {resume_html}
    """
    
    try:
        content = await generate_from_gemini(prompt)
        # Clean up any potential markdown formatting the AI might add
        content = content.replace("```json", "").replace("```", "").strip()
        return json.loads(content)
    except Exception as e:
        return {
            "score": 0,
            "feedback": "Could not parse ATS analysis.",
            "improvements": ["Please try scoring again."]
        }