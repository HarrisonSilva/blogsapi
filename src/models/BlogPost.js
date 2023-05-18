module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        published: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          updated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'blog_posts',
    });
    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreignkey: 'userId', as: 'user'
        })
    }
    return BlogPost;
}