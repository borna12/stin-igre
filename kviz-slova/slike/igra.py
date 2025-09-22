import os

# Trenutni direktorij
folder_path = os.getcwd()

# Ekstenzije slika koje želiš prepoznati
image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff')

# Filtriranje slika u folderu
image_files = [f for f in os.listdir(folder_path) if f.lower().endswith(image_extensions)]

# Spremanje u tekstualnu datoteku
with open('popis_slika.txt', 'w', encoding='utf-8') as f:
    for image in image_files:
        f.write(f"{image}\n")

print("Popis slika spremljen u 'popis_slika.txt'")