from Weasyprint import HTML
import os

HTML(os.path.join("respostas", "resposta14515.html")).write_pdf('resultado.pdf')