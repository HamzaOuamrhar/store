import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Abdo",
      email: "client@client.com",
      password: bcrypt.hashSync("202020"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike Slim Shirt",
      slug: "nike-slim-shirt",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 99,
      countInStock: 12,
      brand: "Nike",
      rating: 4.2,
      numReviews: 8,
      description:
        "The Nike Pro Dri-FIT Top layers you in lightweight fabric with breathability built into heat zones to keep you cool and dry from warmups through cool downs. Stretchy fabric made with at least 75% recycled polyester fibers lets you move freely.",
    },
    {
      name: "Adidas Slim Shirt",
      slug: "adidas-slim-shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 199,
      countInStock: 8,
      brand: "Adidas",
      rating: 4.6,
      numReviews: 18,
      description: "High quality slim shirt of Adidas!",
    },
    {
      name: "Nike Slim Shirt 2",
      slug: "nike-slim-shirt-2",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 99,
      countInStock: 12,
      brand: "Nike",
      rating: 4.2,
      numReviews: 8,
      description:
        "The Nike Pro Dri-FIT Top layers you in lightweight fabric with breathability built into heat zones to keep you cool and dry from warmups through cool downs. Stretchy fabric made with at least 75% recycled polyester fibers lets you move freely.",
    },
    {
      name: "Adidas Slim Shirt 2",
      slug: "adidas-slim-shirt-2",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 199,
      countInStock: 8,
      brand: "Adidas",
      rating: 4.6,
      numReviews: 18,
      description: "High quality slim shirt of Adidas!",
    },
    {
      name: "Nike Slim Shirt 3",
      slug: "nike-slim-shirt-3",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 99,
      countInStock: 12,
      brand: "Nike",
      rating: 4.2,
      numReviews: 8,
      description:
        "The Nike Pro Dri-FIT Top layers you in lightweight fabric with breathability built into heat zones to keep you cool and dry from warmups through cool downs. Stretchy fabric made with at least 75% recycled polyester fibers lets you move freely.",
    },
    {
      name: "Adidas Slim Shirt 3",
      slug: "adidas-slim-shirt-3",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 199,
      countInStock: 8,
      brand: "Adidas",
      rating: 4.6,
      numReviews: 18,
      description: "High quality slim shirt of Adidas!",
    },
  ],
};

export default data;
