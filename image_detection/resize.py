from PIL import Image
import os

def resize_images(directory):
    for category in ["real", "fake"]:  # Loops through 'real' and 'fake' folders
        folder = os.path.join(directory, category)
        for img_name in os.listdir(folder):
            img_path = os.path.join(folder, img_name)
            try:
                img = Image.open(img_path)
                img = img.resize((224, 224))  # Resize to 224x224 pixels
                img.save(img_path)  # Overwrite the image with the resized one
                print(f"Resized: {img_path}")  # Optional: Print progress
            except Exception as e:
                print(f"Error resizing {img_path}: {e}")

# Resize images in train and validation folders
resize_images("dataset/train")
resize_images("dataset/val")
