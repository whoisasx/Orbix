# 🌟 Orbix - Next-Generation Web3 Wallet

<div align="center">

![Orbix Logo](https://img.shields.io/badge/Orbix-Web3%20Wallet-red?style=for-the-badge&logo=ethereum&logoColor=white)

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.15-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

**Orbix** is a next-generation Web3 wallet designed for simplicity, security, and control. Manage your crypto, NFTs, and digital identity — all in one beautifully unified experience.

[🚀 Live Demo](https://orbix-wallet.vercel.app) • [📖 Documentation](#documentation) • [🛠️ Installation](#installation) • [🤝 Contributing](#contributing)

</div>

---

## ✨ Features

### 🔐 **Multi-Chain Wallet Support**

-   **Solana**: Full SOL token and NFT management
-   **Ethereum**: ETH tokens and DeFi protocol interaction
-   **Bitcoin**: Secure BTC storage and transactions

### 🛡️ **Security First**

-   **HD Wallet**: Hierarchical Deterministic wallet generation
-   **BIP39 Mnemonic**: 12-word seed phrase backup
-   **Local Storage**: Private keys never leave your device
-   **Encrypted Keys**: Bank-grade encryption for key storage

### 🎨 **Modern UI/UX**

-   **Responsive Design**: Works seamlessly across all devices
-   **Dark/Light Mode**: Adaptive theme system
-   **Smooth Animations**: Framer Motion powered interactions
-   **Toast Notifications**: Real-time feedback system

### 🔧 **Developer Experience**

-   **TypeScript**: Full type safety
-   **ESLint**: Code quality enforcement
-   **Hot Reload**: Lightning-fast development
-   **Modern Build**: Vite-powered bundling

---

## 🚀 Quick Start

### Prerequisites

-   **Node.js** 18+
-   **npm** or **bun** package manager
-   Modern web browser

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/whoisasx/orbix.git
    cd orbix
    ```

2. **Install dependencies**

    ```bash
    # Using npm
    npm install

    # Using bun (recommended)
    bun install
    ```

3. **Start development server**

    ```bash
    # Using npm
    npm run dev

    # Using bun
    bun run dev
    ```

4. **Open your browser**
    ```
    http://localhost:5173
    ```

### Build for Production

```bash
# Using npm
npm run build

# Using bun
bun run build
```

---

## 📱 Usage Guide

### Creating Your First Wallet

1. **Navigate to Wallets**: Click on "Launch HD Wallet" from the homepage
2. **Generate Seed Phrase**: A secure 12-word mnemonic will be automatically generated
3. **Backup Your Keys**: Save your seed phrase in a secure location
4. **Select Blockchain**: Choose between Solana, Ethereum, or Bitcoin
5. **Create Wallets**: Add multiple wallets for each blockchain

### Managing Wallets

-   **Add Wallet**: Generate new wallet addresses for each blockchain
-   **View Keys**: Toggle visibility for public/private keys
-   **Copy Keys**: One-click copy to clipboard
-   **Delete Wallets**: Remove individual or all wallets
-   **Import Existing**: Use your existing seed phrase

### Exploring dApps

-   **Browse Categories**: Explore DeFi, NFT, Gaming, and Utility dApps
-   **Featured dApps**: Discover trending applications
-   **Connect Wallet**: Seamlessly connect to your favorite dApps

---

## 🏗️ Project Structure

```
orbix/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Bitcoin.tsx      # Bitcoin wallet management
│   │   ├── Ethereum.tsx     # Ethereum wallet management
│   │   ├── Solana.tsx       # Solana wallet management
│   │   ├── WalletCard.tsx   # Individual wallet display
│   │   ├── Navbar.tsx       # Navigation header
│   │   └── Footer.tsx       # Site footer
│   ├── pages/               # Application pages
│   │   ├── Home.tsx         # Landing page
│   │   ├── Wallets.tsx      # Wallet management
│   │   ├── Dapps.tsx        # dApp explorer
│   │   └── LostPath.tsx     # 404 error page
│   ├── store/               # State management
│   │   ├── themeStore.ts    # Theme state (Zustand)
│   │   └── walletStore.ts   # Wallet state (Zustand)
│   ├── utils/               # Utility functions
│   │   └── toast.ts         # Toast notification system
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

---

## 🛠️ Tech Stack

### **Frontend Framework**

-   **React 19.1.1**: Latest React with Concurrent Features
-   **TypeScript 5.9.3**: Static type checking
-   **React Router 7.9.4**: Client-side routing

### **Styling & UI**

-   **Tailwind CSS 4.1.15**: Utility-first CSS framework
-   **Framer Motion 12.23.24**: Animation library
-   **React Icons 5.5.0**: Icon library
-   **React Hot Toast 2.6.0**: Toast notifications

### **Blockchain Integration**

-   **Solana Web3.js 1.98.4**: Solana blockchain interaction
-   **BIP39 3.1.0**: Mnemonic phrase generation
-   **TweetNaCl 1.0.3**: Cryptographic operations
-   **BS58 6.0.0**: Base58 encoding/decoding
-   **ED25519 HD Key 1.3.0**: Hierarchical deterministic keys

### **State Management**

-   **Zustand 5.0.8**: Lightweight state management

### **Development Tools**

-   **Vite 7.1.7**: Build tool and dev server
-   **ESLint 9.36.0**: Code linting
-   **Node Polyfills**: Browser compatibility

---

## 🔐 Security Features

### **Key Management**

-   **Local Storage**: Private keys stored locally, never transmitted
-   **HD Wallet**: BIP32/BIP44 hierarchical deterministic wallets
-   **Seed Phrase**: BIP39 mnemonic phrase backup
-   **Encryption**: Keys encrypted with device-specific entropy

### **Best Practices**

-   **No Server**: Completely client-side application
-   **Open Source**: Transparent and auditable code
-   **Regular Updates**: Security patches and improvements
-   **User Education**: Clear security warnings and guidance

---

## 🌐 Browser Support

-   **Chrome** 88+
-   **Firefox** 85+
-   **Safari** 14+
-   **Edge** 88+

---

## 📚 API Documentation

### **Wallet Management**

```typescript
// Generate new wallet
const generateWallet = (blockchain: "sol" | "eth" | "bit", index: number) => {
	const path = `m/44'/${coinType}'/${index}'/0'`;
	// ... wallet generation logic
};

// Import existing wallet
const importWallet = (mnemonic: string) => {
	if (!validateMnemonic(mnemonic)) {
		throw new Error("Invalid mnemonic phrase");
	}
	// ... import logic
};
```

### **Theme Management**

```typescript
// Theme store
const useThemeStore = create<ThemeStore>((set) => ({
	theme: getInitialTheme(),
	setTheme: (theme: "light" | "dark") => {
		localStorage.setItem("theme", theme);
		document.documentElement.classList.toggle("dark", theme === "dark");
		set({ theme });
	},
}));
```

---

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
tsc --noEmit

# Build and test
npm run build
npm run preview
```

---

## 📦 Deployment

### **Vercel (Recommended)**

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Build**: Vite builds are automatically detected
3. **Deploy**: Automatic deployments on push to main branch

### **Netlify**

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Node Version**: 18+

### **Self-Hosted**

```bash
# Build for production
npm run build

# Serve static files from dist/ directory
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Development Setup**

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### **Guidelines**

-   Follow the existing code style
-   Add TypeScript types for new features
-   Update documentation for API changes
-   Test on multiple browsers
-   Keep commits atomic and descriptive

---

## 🐛 Bug Reports & Feature Requests

-   **Bug Reports**: [Create an issue](https://github.com/whoisasx/orbix/issues/new?template=bug_report.md)
-   **Feature Requests**: [Request a feature](https://github.com/whoisasx/orbix/issues/new?template=feature_request.md)
-   **Security Issues**: Email security@orbix.dev

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Adil Shaikh**

-   **GitHub**: [@whoisasx](https://github.com/whoisasx)
-   **Twitter**: [@whoisasx](https://twitter.com/whoisasx)
-   **LinkedIn**: [Adil Shaikh](https://www.linkedin.com/in/adilshaikh4064/)

---

## 🙏 Acknowledgments

-   **Solana Foundation** for blockchain infrastructure
-   **Ethereum Foundation** for smart contract platforms
-   **React Team** for the amazing framework
-   **Tailwind CSS** for the utility-first approach
-   **Framer** for beautiful animations
-   **Vite Team** for lightning-fast builds

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/whoisasx/orbix?style=social)
![GitHub forks](https://img.shields.io/github/forks/whoisasx/orbix?style=social)
![GitHub issues](https://img.shields.io/github/issues/whoisasx/orbix)
![GitHub pull requests](https://img.shields.io/github/issues-pr/whoisasx/orbix)

---

<div align="center">

**Made with ❤️ for the Web3 community**

⭐ **Star this repository if you find it helpful!**

</div>
