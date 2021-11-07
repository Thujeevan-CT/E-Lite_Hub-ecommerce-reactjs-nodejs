module.exports = (sequelize, DataTypes) => {

    const Orders = sequelize.define("orders", {
        orderid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orderAmount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        transactionId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isDelivered: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })

    return Orders;
}