import os
import random
import shutil

def reduce_dataset(source_dir, dest_dir, num_images):
    for category in ["real", "fake"]:
        src_folder = os.path.join(source_dir, category)
        dest_folder = os.path.join(dest_dir, category)
        
        os.makedirs(dest_folder, exist_ok=True)
        
        # Select random images
        images = os.listdir(src_folder)
        selected_images = random.sample(images, num_images)
        
        # Copy selected images to new folder
        for img in selected_images:
            src_path = os.path.join(src_folder, img)
            dest_path = os.path.join(dest_folder, img)
            shutil.copy(src_path, dest_path)
            
        print(f"Copied {num_images} images for {category}")

# Reduce dataset to 10,000 real and 10,000 fake images
reduce_dataset("dataset/train", "dataset_reduced/train", 10000)
reduce_dataset("dataset/val", "dataset_reduced/val", 2000)  # Validation set (adjust as needed)

