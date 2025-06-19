const mongoose = require('mongoose');
const Product = require('./models/Product'); // Adjust path if needed

const products = [
  {
    name: "BACINA",
    description: "Lace 3/4 balloon sleeve blouse",
    price: 245,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/downloaded_images/Hires_PNG-274218_402_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-274218_402_2.png"
  },
  {
    name: "ABALY",
    description: "Metallic knitted short sleeved top",
    price: 225,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/downloaded_images/Hires_PNG-269451_103_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-269451_103_2.png"
  },
  {
    name: "CILESTE",
    description: "Fitted v-neck long sleeve knit top",
    price: 175,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/downloaded_images/Hires_PNG-266122_115_4.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-266122_115_1.png"
  },
  {
    name: "AGATEA",
    description: "Off shoulder belted wide leg jumpsuit",
    price: 525,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/downloaded_images/Hires_PNG-277286_NAVY_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-277286_NAVY_2.png"
  },
  {
    name: "HOOKLY",
    description: "LS jersey overshirt",
    price: 200,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/downloaded_images/276065_NATURAL_1.png",
    hoverImage: "/css/downloaded_images/276065_NATURAL_2.png"
  },
  {
    name: "ROJOR",
    description: "Short sleeve zip through textured front polo",
    price: 175,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/downloaded_images/275561_NAVY_1.png",
    hoverImage: "/css/downloaded_images/275561_NAVY_2.png"
  },
  {
    name: "ZEITER",
    description: "Slim fit pure cotton polo shirt",
    price: 120,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/downloaded_images/Hires_PNG-268057_451_2.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-268057_451_1.png"
  },
  {
    name: "ERIKS",
    description: "Short sleeve regular textured front t-shirt",
    price: 225,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/downloaded_images/275563_NATURAL_1.png",
    hoverImage: "/css/downloaded_images/275563_NATURAL_2.png"
  },
  {
    name: "WESTWOOD",
    description: "White leather cup sole sneakers",
    price: 185,
    category: "Men",
    subCategory: "Men-Shoes",
    image: "/css/downloaded_images/Hires_PNG-1099570_110_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1099570_110_2.png"
  },
  
  {
    name: "WESTWOOD",
    description: "Black leather cup sole sneakers",
    price: 185,
    category: "Men",
    subCategory: "Men-Shoes",
    image: "/css/downloaded_images/Hires_PNG-1099570_201_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1099570_201_2.png"
  },
  {
    name: "PARLIAMENT",
    description: "Grained leather penny loafers",
    price: 170,
    category: "Men",
    subCategory: "Men-Shoes",
    image: "/css/downloaded_images/Hires_PNG-1099596_001_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1099596_001_2.png"
  },
  {
    name: "REGENT",
    description: "Brown smooth leather derby shoes",
    price: 170,
    category: "Men",
    subCategory: "Men-Shoes",
    image: "/css/downloaded_images/Hires_PNG-1099597_200_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1099597_200_2.png"
  },
  {
    name: "XADON",
    description: "Nylon leather trim double zip backpack",
    price: 295,
    category: "Men",
    subCategory: "Men-Bag",
    image: "/css/downloaded_images/Hires_PNG-1106732_410_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1106732_410_2.png"
  },
  {
    name: "MALCOLM",
    description: "Nylon leather trim messenger bag",
    price: 295,
    category: "Men",
    subCategory: "Men-Bag",
    image: "/css/downloaded_images/Hires_PNG-1106728_201_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1106728_201_2.png"
  },
  {
    name: "ROMAN",
    description: "Nylon leather detail crossbody bag",
    price: 185,
    category: "Men",
    subCategory: "Men-Bag",
    image: "/css/downloaded_images/Hires_PNG-1106726_410_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1106726_410_2.png"
  },
  {
    name: "CAVENDISH",
    description: "Caviar Leather slim card holder",
    price: 50,
    category: "Men",
    subCategory: "Men-Bag",
    image: "/css/downloaded_images/Hires_PNG-1100656_001_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1100656_001_2.png"
  },
  {
    name: "KHLOE",
    description: "Leather metal frame top handle bag",
    price: 225,
    category: "Women",
    subCategory: "Women-Bag",
    image: "/css/downloaded_images/Hires_PNG-1107213_001_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1107213_001_2.png"
  },
  {
    name: "CYRA",
    description: "Metallic leather padlock crossbody bag",
    price: 175,
    category: "Women",
    subCategory: "Women-Bag",
    image: "/css/downloaded_images/Hires_PNG-1107211_711_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1107211_711_2.png"
  },
  {
    name: "CYRA",
    description: "Metallic print padlock crossbody bag",
    price: 175,
    category: "Women",
    subCategory: "Women-Bag",
    image: "/css/downloaded_images/Hires_PNG-1107211_968_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1107211_968_2.png"
  },
  {
    name: "SUKICON",
    description: "Metallic croc structure wide icon tote bag",
    price: 95,
    category: "Women",
    subCategory: "Women-Bag",
    image: "/css/downloaded_images/Hires_PNG-1100198_047_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1100198_047_2.png"
  },
  {
    name: "BELLE",
    description: "Bow embellishment satin heeled sandals",
    price: 180,
    category: "Women",
    subCategory: "Women-Shoes",
    image: "/css/downloaded_images/Hires_PNG-1106650_001_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1106650_001_2.png"
  },
  {
    name: "CHARLOTTE",
    description: "Floral printed pointed toe heeled pumps",
    price: 150,
    category: "Women",
    subCategory: "Women-Shoes",
    image: "/css/downloaded_images/Hires_PNG-1102718_968_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1102718_968_2.png"
  },
  {
    name: "LOLA T-BUCKLE",
    description: "T buckle leather slingback heeled pumps",
    price: 190,
    category: "Women",
    subCategory: "Women-Shoes",
    image: "/css/downloaded_images/Hires_PNG-1106659_001_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1106659_001_2.png"
  },
  {
    name: "MADDY RUCHE",
    description: "Printed satin block heeled sandals",
    price: 175,
    category: "Women",
    subCategory: "Women-Shoes",
    image: "/css/downloaded_images/Hires_PNG-1106651_342_1.png",
    hoverImage: "/css/downloaded_images/Hires_PNG-1106651_342_2.png"
  },
  {
    name: "HULIET",
    description: "Multi hoop drop earrings",
    price: 75,
    category: "Women",
    subCategory: "Women-Accessories",
    image: "/css/downloaded_images/Special_JPG-TBJ3781-02-02_MS_2.jpg",
    hoverImage: "/css/downloaded_images/Special_JPG-TBJ3781-01-02_SFL_1.jpg"
  },
  {
    name: "DOTETTA",
    description: "Dotted texture hoop earrings",
    price: 55,
    category: "Women",
    subCategory: "Women-Accessories",
    image: "/css/downloaded_images/Special_JPG-TBJ3651-02-03_4.jpg",
    hoverImage: "/css/downloaded_images/Special_JPG-TBJ3651-02-03_1.jpg"
  },

  // Additional products from screenshots (continued in next message due to size)
    {
    name: "LONG SLEEVE RUFFLE SHIRT DRESS",
    description: "Long sleeve ruffle hem shirt dress",
    price: 240,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2035911_ULTRA-WHITE_1.jpg",
    hoverImage: "/css/women_downloaded_images/2035911_ULTRA-WHITE_2.jpg"
  },
  {
    name: "BALLOON SLEEVE BUTTON UP SHIRT DRESS",
    description: "Floral balloon sleeve shirt dress",
    price: 385,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2025912_ULTRAWHITE_1.jpg",
    hoverImage: "/css/women_downloaded_images/2025400_TRANSPARENT_YELLOW_7.jpg"
  },
  {
    name: "ALLOVER FLORAL T-SHIRT",
    description: "Short sleeve floral cotton t-shirt",
    price: 95,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2025611_ULTRA-WHITE_1.jpg",
    hoverImage: "/css/women_downloaded_images/2025400_TRANSPARENT_YELLOW_7.jpg"
  },
  {
    name: "SHORT SLEEVE DROP WAIST SHIRT DRESS",
    description: "Drop waist polka dot shirt dress",
    price: 250,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2035908_ULTRA_WHITE_1.jpg",
    hoverImage: "/css/women_downloaded_images/2035905_RICH_BLACK_1.jpg"
  },

  {
    name: "SHORT SLEEVE MESH TOP",
    description: "Embroidered mesh floral top",
    price: 115,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2025618_RICH-BLACK_1.jpg",
    hoverImage: "/css/women_downloaded_images/2025607_RICH-BLACK_1.jpg"
  },
  {
    name: "MESH PRINTED COLUMN DRESS",
    description: "Mesh full sleeve black midi",
    price: 275,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2025723_RICH_BLACK_1_8a2d75d8-4da4-420a-80e5-bc159ef0c6e5.jpg",
    hoverImage: "/css/women_downloaded_images/2025724_RICH_BLACK_1.jpg"
  },

  {
    name: "SLEEVELESS V-NECK PLEATED MAXI DRESS",
    description: "Ultra white pleated sleeveless maxi",
    price: 275,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2025916_ULTRA_WHITE_1.jpg",
    hoverImage: "/css/women_downloaded_images/2025956_HYDRANGEA_1.jpg"
  },
  {
    name: "SLEEVELESS JERSEY MINI DRESS",
    description: "Floral printed fitted mini dress",
    price: 195,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/279249_IVORY_1_72876c36-aa5f-452f-b30e-eb2481047a27.jpg",
    hoverImage: "/css/women_downloaded_images/279767_IVORY_1_662c69ae-c494-4322-9fd1-5314ea865d61.jpg"
  },
  {
    name: "CREW NECK TANK TOP WITH RIB",
    description: "Casual ribbed crew neck tank",
    price: 99,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2025201_RICH_BLACK_1.jpg",
    hoverImage: "/css/women_downloaded_images/2025201_CLASSIC-NAVY_1.jpg"
  },
  {
    name: "SHORT SLEEVE CREW NECK MINI DRESS",
    description: "Simple black mini dress",
    price: 295,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2025729_RICH-BLACK_6.jpg",
    hoverImage: "/css/women_downloaded_images/2025930_RICH-BLACK_1.jpg"
  },
  {
    name: "MAXI SKIRT WITH RIB",
    description: "Elegant ribbed knit black skirt",
    price: 149,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2025804_RICH-BLACK_1.jpg",
    hoverImage: "/css/women_downloaded_images/2025931_RICH_BLACK_1.jpg"
  },
  {
    name: "ALLOVER FLORAL T-SHIRT",
    description: "Allover black floral printed tee",
    price: 115,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2025612_RICH-BLACK_6.jpg",
    hoverImage: "/css/women_downloaded_images/2035601_RICH-BLACK_6.jpg"
  },
  {
    name: "SLEEVELESS MESH TOP",
    description: "Crystal pink mesh floral top",
    price: 95,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2035602_CRYSTAL-PINK_2.jpg",
    hoverImage: "/css/women_downloaded_images/2035301_ULTRA_WHITE_1.jpg"
  },
  {
    name: "FLORAL SATIN FLOWY PANT",
    description: "Ultra white floral satin pants",
    price: 245,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2035301_ULTRA_WHITE_1.jpg",
    hoverImage: "/css/women_downloaded_images/2035602_CRYSTAL-PINK_2.jpg"
  },
  {
    name: "SHORT SLEEVE CREW MESH TOP",
    description: "Crew floral mesh top black",
    price: 115,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2025607_RICH-BLACK_1.jpg",
    hoverImage: "/css/women_downloaded_images/2025618_RICH-BLACK_1.jpg"
  },
  {
    name: "ASYMMETRIC MIDI DRESS",
    description: "Black asymmetric midi fit",
    price: 275,
    category: "Women",
    subCategory: "Women-Clothes",
    image: "/css/women_downloaded_images/2025930_RICH-BLACK_1.jpg",
    hoverImage: "/css/women_downloaded_images/2025616_RICH-BLACK_1.jpg"
  },

{
    name: "T Texture Zip Neck Short Sleeve Polo Shirt",
    description: "Short sleeve polo with zip neck and textured fabric",
    price: 145,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/281708_NAVY_1.jpg",
    hoverImage: "/css/men_downloaded_images/282028_BLACK_1.jpg"
  },
  {
    name: "Mini Check Open Neck Cotton Polo Shirt",
    description: "Cotton polo with mini check and open neck",
    price: 165,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/281687_TAUPE_1.jpg",
    hoverImage: "/css/men_downloaded_images/281706_WHITE_1.jpg"
  },
  {
    name: "Striped Crochet Short Sleeve Overshirt",
    description: "Crochet textured striped overshirt",
    price: 245,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/279244_TAUPE_1.jpg",
    hoverImage: "/css/men_downloaded_images/281701_KHAKI_1.jpg"
  },
  {
    name: "Checked Cotton Linen Harrington Zip Jacket",
    description: "Checked Harrington jacket with linen blend",
    price: 395,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/281677_TAUPE_1.jpg",
    hoverImage: "/css/men_downloaded_images/281678_TAUPE_1.jpg"
  },
  {
    name: "Checked Cotton Linen Straight Leg Shorts",
    description: "Linen shorts with straight fit",
    price: 145,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/281678_TAUPE_1.jpg",
    hoverImage: "/css/men_downloaded_images/281677_TAUPE_1.jpg"
  },
  {
    name: "Branded T Texture Cotton Stretch T-Shirt",
    description: "Stretch t-shirt with branded texture",
    price: 85,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/281706_LT-BLUE_1.jpg",
    hoverImage: "/css/men_downloaded_images/281706_WHITE_1.jpg"
  },
  {
    name: "Scarf Box Print Short Sleeve T-Shirt",
    description: "Short sleeve shirt with box scarf print",
    price: 85,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/281706_WHITE_1.jpg",
    hoverImage: "/css/men_downloaded_images/281704_DK-GREEN_1.jpg"
  },
  {
    name: "Floral Scarf Print Short Sleeve Shirt",
    description: "Short sleeve shirt with floral scarf print",
    price: 165,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/282025_NAVY_1.jpg",
    hoverImage: "/css/men_downloaded_images/282028_BLACK_1.jpg"
  },
  {
    name: "Geometric Cotton Blend Long Sleeve Shirt",
    description: "Geometric pattern cotton blend shirt",
    price: 175,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/280004_PL-BLUE_1.jpg",
    hoverImage: "/css/men_downloaded_images/279346_SKY-BLUE_1.jpg"
  },
  {
    name: "Short Sleeve Open Neck Pointelle Stripe Shirt",
    description: "Pointelle knit stripe shirt with open neck",
    price: 185,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/281701_KHAKI_1.jpg",
    hoverImage: "/css/men_downloaded_images/279244_TAUPE_1.jpg"
  },
  {
    name: "Classic Stripe Cotton Crew Neck T-Shirt",
    description: "Crew neck t-shirt with classic horizontal stripes",
    price: 95,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/281704_DK-GREEN_1.jpg",
    hoverImage: "/css/men_downloaded_images/281684_DK-GREEN_1.jpg"
  },
  {
    name: "Long Sleeve Regular Linen Shirt",
    description: "Regular fit linen shirt with long sleeves",
    price: 210,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/278387_WHITE_1.jpg",
    hoverImage: "/css/men_downloaded_images/281706_WHITE_1.jpg"
  },
  {
    name: "Textured Knit Revere Collar Polo Shirt",
    description: "Textured knit polo with revere collar",
    price: 165,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/281684_DK-GREEN_1.jpg",
    hoverImage: "/css/men_downloaded_images/281704_DK-GREEN_1.jpg"
  },
  {
    name: "Linen Blend Zip Up Harrington Jacket",
    description: "Linen blend zip jacket in Harrington style",
    price: 595,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/278418_DK-GREEN_1.jpg",
    hoverImage: "/css/men_downloaded_images/281687_TAUPE_1.jpg"
  },
 
  {
    name: "Textured Boucle Cotton Blend Blazer",
    description: "Textured cream blazer in boucle cotton blend",
    price: 395,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/280705_ECRU_1.jpg",
    hoverImage: "/css/men_downloaded_images/281677_TAUPE_1.jpg"
  },
  {
    name: "Linen Cotton Single Breasted Blazer",
    description: "Single breasted linen cotton blazer",
    price: 495,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/280329_LT-PINK_1.jpg",
    hoverImage: "/css/men_downloaded_images/280330_LT-PINK_2.jpg"
  },
  {
    name: "Linen Cotton Woven Dress Pants",
    description: "Woven dress pants in linen cotton blend",
    price: 260,
    category: "Men",
    subCategory: "Men-Clothes",
    image: "/css/men_downloaded_images/280330_LT-PINK_2.jpg",
    hoverImage: "/css/men_downloaded_images/280329_LT-PINK_1.jpg"
  }
];

mongoose.connect('mongodb://localhost:27017/tedbaker-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database seeded with products');
  process.exit();
}).catch(err => {
  console.error('MongoDB error:', err);
});



