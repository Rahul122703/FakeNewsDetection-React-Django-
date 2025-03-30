import pandas as pd
import nltk
from nltk.tokenize import sent_tokenize
from transformers import pipeline

# Download necessary NLTK data
nltk.download('punkt')

# Load dataset
df = pd.read_csv(r"C:\Users\Rahul-Pc\Desktop\FakeNewsDetection-React-Django-\indian_datasets\final_news_dataset.csv")

# Load Summarization Model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Generate summarized titles
def generate_title(text):
    if isinstance(text, str) and len(text) > 50:  # Avoid summarizing very short texts
        summary = summarizer(text, max_length=15, min_length=5, do_sample=False)[0]["summary_text"]
        return summary
    elif isinstance(text, str):  
        return sent_tokenize(text)[0]  # If text is short, take first sentence
    else:
        return "Untitled"

df["title"] = df["text"].apply(generate_title)

# Save updated dataset
df.to_csv("news_with_titles.csv", index=False)

print("✅ Dataset with summarized titles saved as 'news_with_titles.csv'")
