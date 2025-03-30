🖼️ Fake Image Detector using Vision Transformer (ViT)

This project is a Fake Image Detector powered by a pre-trained Vision Transformer (ViT) model. It includes a complete pipeline for dataset preprocessing, model training, API deployment, and a user-friendly web interface.

📌 Project Overview

This repository contains multiple Python scripts that together enable image classification to detect fake vs. real images.

📂 Files and Their Purpose

1️⃣ api.py (FastAPI Backend)

Purpose: Runs a backend API for image classification.

Functionality:

Uses FastAPI to create an API endpoint (/predict/).

Loads a pre-trained ViT model and modifies it to classify fake vs. real images.

Accepts an image upload, processes it using ViTFeatureExtractor, and makes a prediction.

Runs using:

uvicorn api:app --host 0.0.0.0 --port 8000

2️⃣ reduce.py (Dataset Reduction)

Purpose: Reduces the dataset size by selecting a limited number of images from each category.

Functionality:

Works on a dataset containing "real" and "fake" images.

Randomly selects num_images from each category and copies them to a new directory.

Used to create a balanced dataset for training/testing.

3️⃣ resize.py (Image Preprocessing - Resizing)

Purpose: Ensures all dataset images have the same size before training.

Functionality:

Iterates through "real" and "fake" images.

Opens each image, resizes it to 224x224 pixels, and saves it back.

Standardizes images for ViT model training.

4️⃣ train.py (Model Training)

Purpose: Trains a Vision Transformer (ViT) model for fake image detection.

Functionality:

Loads the dataset using PyTorch’s ImageFolder.

Applies transformations (resizing, converting to tensors).

Uses a pre-trained ViT model and modifies the classifier for binary classification.

Moves the model to GPU (if available).

Defines loss function (CrossEntropyLoss) and optimizer (Adam).

Trains for 3 epochs (adjustable).

Saves the trained model as:

vit_fake_image_detector.pth

5️⃣ ui.py (Streamlit Web Interface)

Purpose: Provides a simple web UI for users to upload images and get predictions.

Functionality:

Uses Streamlit to create an interactive interface.

Allows users to upload an image.

Sends the image to the FastAPI backend (api.py).

Receives and displays the prediction (Fake or Real).

Requires the FastAPI backend to be running.

🔹 How Everything Connects

1️⃣ Prepare dataset (reduce.py → resize.py).2️⃣ Train the model (train.py).3️⃣ Deploy API (api.py).4️⃣ Create a user-friendly UI (ui.py).

🚀 Installation & Setup

1️⃣ Install Dependencies

Make sure you have Python installed. Then install required dependencies:

pip install -r requirements.txt

2️⃣ Train the Model (Optional)

To train the model from scratch:

python train.py

3️⃣ Run the FastAPI Backend

uvicorn api:app --host 0.0.0.0 --port 8000

4️⃣ Run the Web Interface

streamlit run ui.py

🛠️ Technologies Used

Python

FastAPI (for backend API)

Streamlit (for web UI)

PyTorch (for model training)

Transformers (Hugging Face) (for ViT model)

Torchvision (for dataset processing)

PIL (Pillow) (for image processing)
