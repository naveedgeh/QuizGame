const Shop = require("../Models/Shop");
const ShopItem = require("../Models/ShopItem");

exports.addShop = async (req, res) => {
  const shopobject = new Shop({
    name: req.body.name,
    logo: req.file.originalname,
  });
  const shop = await shopobject.save();
  shop.logo = `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/shop/${shop.logo}`;

  if (!shop) {
    return res.send("please try again");
  }
  return res.send(shop);
};
exports.getShop = async (req, res) => {
  const { pagenumber, pagesize } = req.query;
  const shops = await Shop.find({})
    .skip((pagenumber - 1) * pagesize)
    .limit(pagesize);
  if (shops.length == 0) {
    return res.send("data not found");
  }

  shops.map(
    (s) =>
      (s.logo = `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/shop/${s.logo}`)
  );
  return res.send(shops);
};
exports.addShopItem = async (req, res) => {
  const { id } = req.query;
  const shop = await Shop.findOne({ _id: id });
  if (!shop) {
    return res.send("shop is not find");
  }
  const shopitemObject = new ShopItem({
    name: req.body.name,
    image: req.body.originalname,
    actionLink: req.body.actionlink,
    price: req.body.price,
    shop: {
      _id: shop._id,
      name: shop.name,
    },
  });
  const shopitem = await shopitemObject.save();
  if (!shopitem) {
    return res.send("shop Item is not creaed");
  }
  return res.send(shopitem);
};
exports.getShopItem = async (req, res) => {
  const { pagenumber, pagesize } = req.query;
  const { shopId } = req.params;
  console.log(shopId);
  const shopItems = await ShopItem.find({ "shop._id": shopId })
    .skip((pagenumber - 1) * pagesize)
    .limit(pagesize);
  if (shopItems.length == 0) {
    res.send("data is not found");
  }
  return res.send(shopItems);
};
