from PIL import Image, ImageOps, ImageFilter


def preprocess_image(image: Image.Image) -> Image.Image:
    # Convert image to grayscale
    image = ImageOps.grayscale(image)

    # Improve contrast
    image = ImageOps.autocontrast(image)

    # Reduce small noise
    image = image.filter(ImageFilter.MedianFilter(size=3))

    return image