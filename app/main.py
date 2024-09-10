from unstructured.partition.auto import partition

# Carregue o PDF
fileName = 'redacao-o_narcisismo_e_a_cultura_das_selfies-karina_rossi.pdf'
path = 'resources/' + fileName
elements = partition(filename=path, languages=["portuguese", "english"], strategy="hi_res")

text_parts = []
for element in elements:
    text_parts.append(element.text)

print(text_parts)
