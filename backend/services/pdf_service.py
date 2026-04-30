import io
from xhtml2pdf import pisa

def generate_pdf_from_html(html_content: str) -> io.BytesIO:
    # We wrap the AI-generated content in a clean A4 PDF structure
    # This completely avoids the infinite loop string replacement bug!
    full_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            @page {{
                size: a4 portrait;
                margin: 2cm;
            }}
            body {{
                font-family: Helvetica, Arial, sans-serif;
                font-size: 14px;
                color: #333333;
                line-height: 1.6;
            }}
            h1, h2, h3 {{
                color: #2c3e50;
                border-bottom: 1px solid #eeeeee;
                padding-bottom: 5px;
            }}
            .contact-info {{
                text-align: center;
                color: #666666;
                margin-bottom: 20px;
            }}
        </style>
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """

    pdf_buffer = io.BytesIO()
    
    # Generate the PDF
    pisa_status = pisa.CreatePDF(
        full_html,
        dest=pdf_buffer
    )

    # Reset buffer position to the beginning before returning
    pdf_buffer.seek(0)
    
    if pisa_status.err:
        raise Exception("Failed to generate PDF document")
        
    return pdf_buffer