import pypdf
import os

def extract_pdf_to_txt(pdf_path, txt_path):
    print(f"Extracting {pdf_path} to {txt_path}...")
    reader = pypdf.PdfReader(pdf_path)
    text = ""
    for i, page in enumerate(reader.pages):
        text += f"--- PAGE {i + 1} ---\n"
        text += page.extract_text() + "\n\n"
    
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Extraction of {pdf_path} complete.")

if __name__ == "__main__":
    base_dir = "/Users/jestinjoseph/Documents/personal/cmr-dev/cmr/seo-doc"
    
    plan_pdf = os.path.join(base_dir, "CMR-Developers-SEO-Website-Plan.pdf")
    plan_txt = os.path.join(base_dir, "CMR-Developers-SEO-Website-Plan.txt")
    if os.path.exists(plan_pdf):
        extract_pdf_to_txt(plan_pdf, plan_txt)
        
    content_pdf = os.path.join(base_dir, "CMR-Developers-Website-Content.pdf")
    content_txt = os.path.join(base_dir, "CMR-Developers-Website-Content.txt")
    if os.path.exists(content_pdf):
        extract_pdf_to_txt(content_pdf, content_txt)
