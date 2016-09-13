Collections = {};
Schemas = {};
var Products = new Mongo.Collection("products");
var ProductVariationSchema = new SimpleSchema({
    id: {
        type: String,
        autoValue: function () {
            if(!this.isSet){
                return Random.id();
            }
        }
    },
    quantity: {
        type: String
    },
    size: {
        type: String
    }
});
Schemas.ProductVariationSchema = ProductVariationSchema;
var ProductSchema = new SimpleSchema({
    name: {
        type: String,
        unique: true
    },
    category:{
        type: String
    },
    brand: {
        type: String
    },
    color:{
        type: String
    },
    price:{
        type: String
    },
    variations:{
        type: [Schemas.ProductVariationSchema]
    }
});
Schemas.ProductSchema = ProductSchema;
Collections.Products = Products;
Collections.Products.attachSchema(Schemas.ProductSchema);