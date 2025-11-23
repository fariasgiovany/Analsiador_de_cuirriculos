import PyPDF2
from PyPDF2 import PdfReader
import os

class Pdfoperacoes:
    def __init__(self, arquivo):
        self.arquivo = arquivo
        self.reader = PdfReader(arquivo)
    def gettext(self):
        texto = "verificar se texto acima é um currículo, se não for um curriculo responder apenas ""texto invalido"".Adcionar melhorias ao curriculo. Criar uma introdução no curriculo. Formatar texto em html com foco em impressão. Não adicionar sugestões no arquivo html, mostrar links inteiros.Resposta apenas com o texto em html com algum design gráfico e com cabeçalho centralizado"
        for pagina in self.reader.pages:
            texto += pagina.extract_text()
            texto=texto.replace("\n"," ")
        texto=texto+"se não tiver informaçoes sobre curriculo, responder apenas texto invalido e não analisar texto."
        
        return texto
