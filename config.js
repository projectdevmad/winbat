var regions =[
	{
		"key": "",
		"value": "Region"
	},
	{
		"key": "Argentina",
		"value": "Argentina"
	},
	{
		"key": "Australia",
		"value": "Australia"
	},
	{
		"key": "Austria",
		"value": "Austria"
	},
	{
		"key": "Brazil",
		"value": "Brazil"
	},
	{
		"key": "Bulgaria",
		"value": "Bulgaria"
	},
	{
		"key": "Canada",
		"value": "Canada"
	},
	{
		"key": "Chile",
		"value": "Chile"
	},
	{
		"key": "China",
		"value": "China"
	},
	{
		"key": "Croatia",
		"value": "Croatia"
	},
	{
		"key": "France",
		"value": "France"
	},
	{
		"key": "Georgian Republic",
		"value": "Georgian Republic"
	},
	{
		"key": "Germany",
		"value": "Germany"
	},
	{
		"key": "Greece",
		"value": "Greece"
	},
	{
		"key": "Hungary",
		"value": "Hungary"
	},
	{
		"key": "India",
		"value": "India"
	},
	{
		"key": "Israel",
		"value": "Israel"
	},
	{
		"key": "Italy",
		"value": "Italy"
	},
	{
		"key": "Lebanon",
		"value": "Lebanon"
	},
	{
		"key": "Mexico",
		"value": "Mexico"
	},
	{
		"key": "Morocco",
		"value": "Morocco"
	},
	{
		"key": "New Zealand",
		"value": "New Zealand"
	},
	{
		"key": "Portugal",
		"value": "Portugal"
	},
	{
		"key": "Slovenia",
		"value": "Slovenia"
	},
	{
		"key": "South Africa",
		"value": "South Africa"
	},
	{
		"key": "Spain",
		"value": "Spain"
	},
	{
		"key": "Switzerland",
		"value": "Switzerland"
	},
	{
		"key": "Turkey",
		"value": "Turkey"
	},
	{
		"key": "UK",
		"value": "UK"
	},
	{
		"key": "Uruguay",
		"value": "Uruguay"
	},
	{
		"key": "USA",
		"value": "USA"
	},
	{
		"key": "Other",
		"value": "Other"
	}
	
];
var prices =[
	{
		"key": "",
		"value": "Price"
	},
	{
		"key": "0-100",
		"value": "$0-$100"
	},
	{
		"key": "100-500",
		"value": "$100-$500"
	},
	{
		"key": "500-1000",
		"value": "$500-$1000"
	},
	{
		"key": "1000-3000",
		"value": "$1000-$3000"
	},
	{
		"key": "3000-10000",
		"value": "$3000-$10000"
	},
	{
		"key": "10000-9999999",
		"value": "$10000+"
	}
];
var styles =[
	{
		"key": "",
		"value": "Style"
	},
	{
		"key": "Red",
		"value": "Red"
	},
	{
		"key": "White",
		"value": "White"
	},
	{
		"key": "Rose",
		"value": "Rose"
	},
	{
		"key": "Sparkling",
		"value": "Sparkling"
	},
	{
		"key": "Dessert",
		"value": "Dessert"
	},
	{
		"key": "Other",
		"value": "Other"
	}
];
var grapes =[
	{
		"key": "",
		"value": "Grapes"
	},
	{
		"key": "Aglianico",
		"value": "Aglianico"
	},
	{
		"key": "Albariño",
		"value": "Albariño"
	},
	{
		"key": "Assyrtiko",
		"value": "Assyrtiko"
	},
	{
		"key": "Cabernet Franc",
		"value": "Cabernet Franc"
	},
	{
		"key": "Cabernet Sauvignon",
		"value": "Cabernet Sauvignon"
	},
	{
		"key": "Carignan",
		"value": "Carignan"
	},
	{
		"key": "Carménère",
		"value": "Carménère"
	},
	{
		"key": "Chardonnay",
		"value": "Chardonnay"
	},
	{
		"key": "Chenin Blanc",
		"value": "Chenin Blanc"
	},
	{
		"key": "Cinsault",
		"value": "Cinsault"
	},
	{
		"key": "Dolcetto",
		"value": "Dolcetto"
	},
	{
		"key": "Fiano",
		"value": "Fiano"
	},
	{
		"key": "Friulano",
		"value": "Friulano"
	},
	{
		"key": "Gamay",
		"value": "Gamay"
	},
	{
		"key": "Gewürztraminer",
		"value": "Gewürztraminer"
	},
	{
		"key": "Grenache",
		"value": "Grenache"
	},
	{
		"key": "Grüner Veltliner",
		"value": "Grüner Veltliner"
	},
	{
		"key": "Malbec",
		"value": "Malbec"
	},
	{
		"key": "Malagousia",
		"value": "Malagousia"
	},
	{
		"key": "Merlot",
		"value": "Merlot"
	},
	{
		"key": "Montepulciano",
		"value": "Montepulciano"
	},
	{
		"key": "Mourvèdre",
		"value": "Mourvèdre"
	},
	{
		"key": "Nebbiolo",
		"value": "Nebbiolo"
	},
	{
		"key": "Pinot Gris",
		"value": "Pinot Gris"
	},
	{
		"key": "Pinot Grigio",
		"value": "Pinot Grigio"
	},
	{
		"key": "Pinot Noir",
		"value": "Pinot Noir"
	},
	{
		"key": "Pinotage",
		"value": "Pinotage"
	},
	{
		"key": "Primitivo",
		"value": "Primitivo"
	},
	{
		"key": "Prosecco",
		"value": "Prosecco"
	},
	{
		"key": "Riesling",
		"value": "Riesling"
	},
	{
		"key": "Sangiovese",
		"value": "Sangiovese"
	},
	{
		"key": "Sauvignon Blanc",
		"value": "Sauvignon Blanc"
	},
	{
		"key": "Shiraz",
		"value": "Shiraz"
	},
	{
		"key": "Syrah",
		"value": "Syrah"
	},
	{
		"key": "Sémillon",
		"value": "Sémillon"
	},
	{
		"key": "Tempranillo",
		"value": "Tempranillo"
	},
	{
		"key": "Tinto Fino",
		"value": "Tinto Fino"
	},
	{
		"key": "Torrontés",
		"value": "Torrontés"
	},
	{
		"key": "Touriga Nacional",
		"value": "Touriga Nacional"
	},
	{
		"key": "Verdicchio",
		"value": "Verdicchio"
	},
	{
		"key": "Viognier",
		"value": "Viognier"
	},
	{
		"key": "Zinfandel",
		"value": "Zinfandel"
	}
];