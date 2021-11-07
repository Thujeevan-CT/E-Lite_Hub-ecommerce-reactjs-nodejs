module.exports = (sequelize, DataTypes) => {

    const OrderItems = sequelize.define("orderItems", {
        orderItemid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        transactionId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },

    })
    return OrderItems;
}