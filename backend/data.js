import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Hamza",
      email: "admin@admin.com",
      password: bcrypt.hashSync("202020"),
      isAdmin: true,
    },
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
      image: "/images/p1.jpg",
      price: 199,
      countInStock: 8,
      brand: "Adidas",
      rating: 4.6,
      numReviews: 18,
      description: "High quality slim shirt of Adidas!",
    },
    {
      name: "Lacoste Slim Shirt",
      slug: "lacoste-slim-shirt",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 89,
      countInStock: 102,
      brand: "Lacoste",
      rating: 3.9,
      numReviews: 75,
      description: "High quality slim shirt of Lacoste!",
    },
    {
      name: "Nike Slim Short",
      slug: "nike-slim-short",
      category: "Shorts",
      image: "/images/p2.jpg",
      price: 12,
      countInStock: 0,
      brand: "Nike",
      rating: 2.2,
      numReviews: 2,
      description: "High quality slim short of Nike!",
    },
    {
      name: "Adidas Slim Short",
      slug: "adidas-slim-short",
      category: "Shorts",
      image: "/images/p2.jpg",
      price: 15,
      countInStock: 18,
      brand: "Adidas",
      rating: 5,
      numReviews: 14,
      description: "High quality slim short of Adidas!",
    },
    {
      name: "Lacoste Slim Short",
      slug: "lacoste-slim-Short",
      category: "Shorts",
      image: "/images/p2.jpg",
      price: 75,
      countInStock: 102,
      brand: "Lacoste",
      rating: 4.9,
      numReviews: 13,
      description: "High quality slim short of Lacoste!",
    },
  ],
};

export default data;
