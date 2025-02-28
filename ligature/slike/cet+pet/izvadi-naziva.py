import os

# Postavi putanju do foldera sa slikama
folder_path = "."
output_file = "nazivi_slika.txt"

# Dozvoljeni formati slika
image_extensions = (".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp")

# Dohvati sve nazive slika
image_names = [f for f in os.listdir(folder_path) if f.lower().endswith(image_extensions)]

# Zapiši nazive u tekstualni fajl
with open(output_file, "w", encoding="utf-8") as file:
    for name in image_names:
        file.write(name + "\n")

print(f"Završeno! Nazivi slika su zapisani u {output_file}")
