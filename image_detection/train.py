from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import torch.nn as nn
import torch.optim as optim
import torch
from transformers import ViTForImageClassification

# Check if GPU is available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Define Transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# Load Dataset
train_data = datasets.ImageFolder(root="dataset/train", transform=transform)
train_loader = DataLoader(train_data, batch_size=16, shuffle=True)

# Load Pretrained ViT Model
model = ViTForImageClassification.from_pretrained("google/vit-base-patch16-224")
model.classifier = nn.Linear(model.config.hidden_size, 2)  # 2 classes: Fake or Real
model.to(device)  # Move model to GPU/CPU

# Define Loss & Optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.0001)

# Train the Model
num_epochs = 3  # Reduced from 5 to 3
for epoch in range(num_epochs):
    model.train()
    total_loss = 0
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)  # Move to GPU/CPU
        
        optimizer.zero_grad()
        outputs = model(images).logits
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()

    avg_loss = total_loss / len(train_loader)  # Calculate average loss
    print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {avg_loss:.4f}")

# Save Trained Model
torch.save(model.state_dict(), "vit_fake_image_detector.pth")
print("✅ Model saved successfully!")
