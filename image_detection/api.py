from fastapi import FastAPI, File, UploadFile
import torch
from PIL import Image
from transformers import ViTFeatureExtractor, ViTForImageClassification

app = FastAPI()

# Load Model (Ensure classifier is modified BEFORE loading weights)
model = ViTForImageClassification.from_pretrained("google/vit-base-patch16-224")
model.classifier = torch.nn.Linear(model.config.hidden_size, 2)  # Ensure 2-class classifier
model.load_state_dict(torch.load("vit_fake_image_detector.pth", map_location=torch.device('cpu')))  # Load trained model
model.eval()  # Set to evaluation mode

feature_extractor = ViTFeatureExtractor.from_pretrained("google/vit-base-patch16-224")

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    image = Image.open(file.file)
    inputs = feature_extractor(images=image, return_tensors="pt")

    with torch.no_grad():
        logits = model(**inputs).logits

    predicted_class = logits.argmax().item()
    return {"result": "Fake" if predicted_class == 1 else "Real"}

# Run API: uvicorn api:app --host 0.0.0.0 --port 8000
