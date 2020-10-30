def category_id_to_string(category_id):
	categories = [
		"T-shirt/top"
		, "Trouser"
		, "Pullover"
		, "Dress"
		, "Coat"
		, "Sandal"
		, "Shirt"
		, "Sneaker"
		, "Bag"
		, "Ankle boot"
	]
	return categories[category_id]


def fetch():
	from pathlib import Path
	Path("temp").mkdir(parents=True, exist_ok=True)

	import os
	import wget

	fmnist_files = [
		{
			"url": "http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/train-images-idx3-ubyte.gz"
			, "filename": "temp/train-images-idx3-ubyte.gz"
		}
		, {
			"url": "http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/train-labels-idx1-ubyte.gz"
			, "filename": "temp/train-labels-idx1-ubyte.gz"
		}
		, {
			"url": "http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/t10k-images-idx3-ubyte.gz"
			, "filename": "temp/t10k-images-idx3-ubyte.gz"
		}
		, {
			"url": "http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/t10k-labels-idx1-ubyte.gz"
			, "filename": "temp/t10k-labels-idx1-ubyte.gz"
		}
	]

	for this_file in fmnist_files:
		try:
			f = open(this_file["filename"])
			f.close()
		except FileNotFoundError:
			wget.download(this_file["url"], this_file["filename"])
	