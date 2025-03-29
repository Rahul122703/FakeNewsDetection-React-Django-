import streamlit as st
import requests
from PIL import Image

st.title("🖼️ Fake Image Detector using ViT")

uploaded_file = st.file_uploader("Upload an Image", type=["jpg", "png"])
if uploaded_file:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image", use_column_width=True)

    files = {"file": uploaded_file.getvalue()}
    response = requests.post("http://192.168.137.41:8000/predict/", files=files)
    result = response.json()["result"]

    st.write(f"🔍 **Prediction:** {result}")
