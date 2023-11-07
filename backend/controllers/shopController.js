const Shop = require('../models/Shop');
const User = require('../models/User')

const shopController = {

    getAllShops: async (req, res, next) => {
        try {
            const shops = await Shop.find({}).populate('products');
            res.status(200).json(shops);
        } catch (error) {
            next(error);
        }
    },

    getShopById: async (req, res, next) => {
        try {
            const { id } = req.query;
            const shop = await Shop.findById(id).populate('ownerId').populate('products');
            if (!shop) {
                return res.status(404).json({ message: "Shop not found" });
            }
            res.status(200).json(shop);
        } catch (error) {
            next(error);
        }
    },

    createShop: async (req, res, next) => {
        try {
            const { name, description, ownerId, address, phone } = req.body;

            const existingShop = await Shop.findOne({ name });
            if (existingShop) {
                return res.status(400).json({ message: "Tên cửa hàng đã tồn tại." });
            }
    
            const owner = await User.findById({ _id: ownerId });
            if (!owner) {
                return res.status(400).json({ message: "ownerId không tồn tại trong cơ sở dữ liệu." });
            }
    
            const phoneRegex = /^(03|05|07|08|09|01[2689])+([0-9]{8})\b/;
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({ message: "Định dạng số điện thoại không hợp lệ." });
            }
    
            const newShop = new Shop({
                name, 
                description, 
                ownerId, 
                products: [],  
                address, 
                phone
            });

            const savedShop = await newShop.save();

            owner.shopId = savedShop._id;
            await owner.save();

            res.status(201).json({
                success: true,
                message: "Shop created successfully!",
                shop: newShop
            });
        } catch (error) {
            if (error.name === 'CastError') {
                return res.status(400).json({ message: "ownerId không hợp lệ hoặc không tồn tại trong cơ sở dữ liệu." });
            }
            next(error);
        }
    },

    updateShopById: async (req, res, next) => {
        try {
            const { id, name, description, ownerId, products, address, phone } = req.body;
    
            const shop = await Shop.findById(id);
            if (!shop) {
                return res.status(404).json({ message: "Shop not found" });
            }
    
            const owner = await User.findOne({ _id: ownerId }); 
            if (!owner) {
                return res.status(400).json({ message: "ownerId không tồn tại trong cơ sở dữ liệu." });
            }
    
            const phoneRegex = /^(03|05|07|08|09|01[2689])+([0-9]{8})\b/;
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({ message: "Định dạng số điện thoại không hợp lệ." });
            }
    
            const existingShop = await Shop.findOne({ name, _id: { $ne: id } }); 
            if (existingShop) {
                return res.status(400).json({ message: "Tên cửa hàng đã tồn tại." });
            }

            // if (String(shop.ownerId) !== String(ownerId)) {
            //     if (shop.ownerId) {
            //         const oldOwner = await User.findById(shop.ownerId);
            //         if (oldOwner) {
            //             oldOwner.shopId = null;
            //             await oldOwner.save();
            //         }
            //     }
    
            //     owner.shopId = id;
            //     await owner.save();
            // }
            owner.shopId = id;

            shop.name = name;
            shop.description = description;
            shop.ownerId = ownerId;
            shop.address = address;
            shop.phone = phone;
    
        
            await owner.save();
            await shop.save();
    
            res.status(200).json({
                success: true,
                message: "Shop updated successfully!",
                shop
            });
        } catch (error) {
            next(error);
        }
    },
    

    deleteShopById: async (req, res, next) => {
        try {
            const { id } = req.query;
            const shop = await Shop.findById(id);
            if (!shop) {
                return res.status(404).json({ message: "Shop not found" });
            }

            await User.updateMany({ shopId: id }, { $set: { shopId: null } });

            await Shop.findByIdAndRemove(id);

            res.status(200).json({
                success: true,
                message: "Shop deleted successfully!"
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = shopController;
