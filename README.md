# Fake News Detector

**Need**

With the rise in popularity of social media and fake news, verifying the reliability of news has become difficult. A machine learning fake news detector can address this problem at scale. Users can check the reliability of news articles through a model trained on thousands of articles. While this solution does not guarantee complete accuracy, it is a good way to limit misinformation in the age of AI and social media.

The main beneficiaries of this project will be everyday news readers who want to quickly ensure the reliability of the information they are reading.

**Dataset**

* [Fake and Real News Dataset on Kaggle](https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset)
  * Contains the title, text, subject, and date of 44,919 articles
  * The articles span from March 30th, 2015 to February 18th, 2018
    * Each article is labeled either real or fake
    * 21,417 are real (21,195 post cleaning)
    * 23,502 are fake (17,455 post cleaning)

**Tools**

* [Hugging Face Transformers](https://huggingface.co/microsoft/harrier-oss-v1-270m)
  * We will use the Harrier model from the Transformers library to extract embeddings from the article text
* [PyTorch](https://pytorch.org/)
  * We will create a deep learning model with PyTorch to classify articles as real or fake based on the title and text of the article
* [Newspaper](https://newspaper.readthedocs.io/en/latest/)
  * While the initial dataset will allow us to train and test a model based on labelled data, the Newspaper package will allow for extracting new articles for our website application

**Sketch**

<img width="1728" height="2304" alt="Sketch" src="https://github.com/user-attachments/assets/8fb49434-55db-43fa-99ab-3528ff1da725" />


When a user inputs a URL, we first use the Newspaper package to extract the title and body from the article. Then, we will make minor edits to this text so that it can be fed into Harrier and turned into embeddings. The embeddings will then be fed into the model that we trained, which will output a verdict: real or fake. This output will then be returned to the user.
