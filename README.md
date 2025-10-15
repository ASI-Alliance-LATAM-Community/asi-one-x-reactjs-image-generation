# ReactJS ASI:One Image Generation

This repository provides a demonstration of integrating **ASI:One** with **React.js** for AI-powered image generation.
Its primary objective is to serve as a reference implementation for creating beautiful user interfaces that interact with ASI:One's image generation API, showcasing how to build modern web applications with AI capabilities.

## Features

* **Text-to-Image Generation** - Generate high-quality images from text descriptions
* **Multiple Image Sizes** - Support for 512x512, 768x768, and 1024x1024 resolutions  
* **ASI1 Mini Model** - Powered by the ASI1-mini model for fast and efficient generation
* **Image Download** - Download generated images directly to your device
* **Example Prompts** - Pre-built example prompts for inspiration
* **Smart Tips** - Built-in guidance for creating better prompts
* **Secure API Key Input** - Password-masked API key field for security

## Prerequisites

* Node.js (LTS version recommended)
* npm or yarn package manager
* A valid **ASI:One API key** (get yours at [asi1.ai](https://asi1.ai/dashboard/api-keys))

## Installation & Usage

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd reactjs-asi-one-image-generation
   ```

2. Install the project dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

5. Enter your ASI:One API key in the application interface

6. Start generating images by entering prompts and clicking "Generate Image"

## How to Use

1. **Enter API Key**: Input your ASI:One API key in the password field
2. **Write a Prompt**: Describe the image you want to generate in detail
3. **Select Image Size**: Choose from 512x512, 768x768, or 1024x1024 pixels
4. **Choose Model**: Currently supports ASI1-mini model
5. **Generate**: Click the "Generate Image" button and wait for your image
6. **Download**: Use the download button to save your generated image

## Technologies Used

* **React.js** - Frontend framework
* **TypeScript** - Type safety and better development experience
* **Tailwind CSS** - Utility-first CSS framework for styling
* **Lucide React** - Beautiful icon library
* **ASI:One API** - AI-powered image generation

## API Integration

This application integrates with the ASI:One API endpoint:
```
https://api.asi1.ai/v1/image/generate
```

The app handles:
- Bearer token authentication
- JSON request/response formatting
- Base64 image data processing
- Error handling and user feedback

## License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues related to the ASI:One API, please visit [asi1.ai](https://asi1.ai) or check their documentation.
For issues with this React application, please open an issue in this repository.
