import axios from "axios";
import Order from "../models/orders.js";

export const createOrder = async (req, res) => {
    try {
        //takes in product customer, email,address 
        const ID = genID();
        const details = req.body;// request boday contains name ,address , email and product
        const neworder = new Order({ order_id: ID, product: details.product, price: details.price });
        try {
            await axios.patch(`https://inventory-elbarbary01.vercel.app/api/products/${details.product.product_id}`)
        } catch (e1) {
            const {data} = e1;
           return res.status(400).json({message: "out of stock"});
        }
        try{
        await axios.post("https://shipping-rabbitmart-elbarbary01.vercel.app/api/shipping", { "order_id": ID, "address": details.address, "total": details.price });
        } catch(e2){console.log(e2);}
        await axios.post("https://notification-three.vercel.app/notification/", { "orderID": ID, "address": details.address, "price": details.product.price, "product": details.product.name, "name": details.customer, "email": details.email })
        await neworder.save();
        res.status(200).json(neworder);
    }catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await Order.findOne({ order_id: id });

        let newStatus;
        switch (order.status) {
            case 'CREATED':
                newStatus = 'PROCESSING';
                break;
            case 'PROCESSING':
                newStatus = Math.random() > .5 ? 'FULLFILLED' : 'CANCELED'
                break;
            default:
                newStatus = 'CREATED'
        };

        await Order.findOneAndUpdate({ order_id: id }, { status: newStatus });
        res.status(200).json(newStatus);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}


function genID() {
    let ID = "";
    const st = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 5; i++) {
        ID += st.charAt(Math.floor(Math.random() * st.length));
    }
    return ID;
}