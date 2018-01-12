<?php
sleep(1);
die();
          header("Content-Type: application/json");
         echo $_GET['callback'] . '(' .'{
  "products": [
    
    {  "product": "Mouton",
          "size": "375ml",
          "updated_at": "2018-01-04T07:25:41.927Z",
          "img_url": "https://www.y18.hk/image/cache/data/Bordeaux/Mouton-229x282.jpg",
          "vintage": "2010",
          "price": 2900,
          "currency": "HKD",
          "display": "Mouton 2010 (375ml) [A]",
      "inventories": [
        {
         
          "price": 2900,
         
          "merchant": "Y18 Elegant Spirits Ltd.",
        
          "currency": "HKD",
          "merchant_url": "https://www.y18.hk/index.php"
        }
      ],
      "catalog": {
        "vintage": "2010",
        "name": "Mouton"
      },
      "tasting_note": {
        "acidity": 3,
        "tanin": 3,
        "sweetness": 4,
        "body": 5,
        "smell": [
          {
            "img_url": "https://s3-ap-southeast-1.amazonaws.com/alcoholics-beverages/tasting-icons/apple.svg",
            "taste": "apple",
            "vote": 12
          },
          {
            "img_url": "https://s3-ap-southeast-1.amazonaws.com/alcoholics-beverages/tasting-icons/butter.svg",
            "taste": "butter",
            "vote": 37
          }
        ]
      }
    },
    {  "product": "Mouton",
          "size": "375ml",
          "updated_at": "2018-01-04T07:25:41.927Z",
          "img_url": "https://www.y18.hk/image/cache/data/Bordeaux/Mouton-229x282.jpg",
          "vintage": "2010",
          "price": 2900,
          "currency": "HKD",
          "display": "Mouton 2010 (375ml) [A]",
      "inventories": [
        {
         
          "price": 2900,
         
          "merchant": "Y18 Elegant Spirits Ltd.",
        
          "currency": "HKD",
          "merchant_url": "https://www.y18.hk/index.php"
        }
      ],
      "catalog": {
        "vintage": "2010",
        "name": "Mouton"
      },
      "tasting_note": {
        "acidity": 3,
        "tanin": 3,
        "sweetness": 4,
        "body": 5,
        "smell": [
          {
            "img_url": "https://s3-ap-southeast-1.amazonaws.com/alcoholics-beverages/tasting-icons/apple.svg",
            "taste": "apple",
            "vote": 12
          },
          {
            "img_url": "https://s3-ap-southeast-1.amazonaws.com/alcoholics-beverages/tasting-icons/butter.svg",
            "taste": "butter",
            "vote": 37
          }
        ]
      }
    }
   
  ]
}' . ')';

       
?>