# TechMart E-commerce Site

A modern e-commerce platform built with React, Redux, and Tailwind CSS.

## Features

- 1000+ products with realistic data
- Modern UI with smooth animations
- Google OAuth integration
- Shopping cart functionality
- Product filtering and sorting
- Special deals section
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google OAuth credentials

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/techmart.git
cd techmart
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Google OAuth client ID:
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── sections/
│       └── ProductCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── Cart.jsx
│   ├── Account.jsx
│   └── Deals.jsx
├── store/
│   ├── index.js
│   └── slices/
│       ├── cartSlice.js
│       ├── authSlice.js
│       └── productsSlice.js
├── utils/
│   └── generateProducts.js
├── App.jsx
└── main.jsx
```

## Technologies Used

- React
- Redux Toolkit
- React Router
- Tailwind CSS
- Framer Motion
- Google OAuth

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 