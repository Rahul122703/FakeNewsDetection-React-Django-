from django.conf import settings
import os
import pickle

def load_models():
    nb_model_path = os.path.join(settings.BASE_DIR, "models", "nb_model.pkl")
    vectorizer_model_path = os.path.join(settings.BASE_DIR, "models", "vectorizer_model.pkl")
    image_detection = os.path.join(settings.BASE_DIR, "models", "vectorizer_model.pkl")
    
    nb_model = pickle.load(open(nb_model_path, "rb"))
    vect_model = pickle.load(open(vectorizer_model_path, "rb"))
    img_model = pickle.load(open(image_detection, "rb"))
    
    return nb_model, vect_model,img_model