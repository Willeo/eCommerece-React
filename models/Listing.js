module.exports = function(sequelize, DataTypes) {
    let Listing = sequelize.define('Listing', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        category: {
            type: DataTypes.STRING,
            defaultValue: 'Electronics',
        },
        pictures: {
            type: DataTypes.TEXT('long'),
            get: function() {
                return JSON.parse(this.getDataValue('pictures'));
            },
            set: function(value) {
                this.setDataValue('pictures', JSON.stringify(value));
            },
        },
    });
    return Listing;
};
