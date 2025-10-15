import { useState } from 'react'
import { Button } from './components/ui/button'
import { Loader2, Download, ImageIcon } from 'lucide-react'

interface ImageGenerationResponse {
  status: number
  message: string
  created: number
  images: Array<{
    url: string
  }>
}

function App() {
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState('1024x1024')
  const [model, setModel] = useState('asi1-mini')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('')

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    if (!apiKey.trim()) {
      setError('Please enter your API key')
      return
    }

    setIsLoading(true)
    setError(null)
    setGeneratedImage(null)

    try {
      const response = await fetch('https://api.asi1.ai/v1/image/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          size: size,
          model: model,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ImageGenerationResponse = await response.json()

      if (result.images && result.images.length > 0) {
        const imageUrl = result.images[0].url
        if (imageUrl.startsWith('data:image/')) {
          setGeneratedImage(imageUrl)
        } else {
          throw new Error('Unexpected image URL format')
        }
      } else {
        throw new Error('No images found in response')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const downloadImage = () => {
    if (!generatedImage) return

    const base64Data = generatedImage.split(',')[1]
    const imageData = atob(base64Data)
    const arrayBuffer = new ArrayBuffer(imageData.length)
    const uint8Array = new Uint8Array(arrayBuffer)
    
    for (let i = 0; i < imageData.length; i++) {
      uint8Array[i] = imageData.charCodeAt(i)
    }

    const blob = new Blob([uint8Array], { type: 'image/png' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `generated-image-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const sizeOptions = [
    { value: '1024x1024', label: '1024×1024 (Large Square)' },
    { value: '768x768', label: '768×768 (Medium Square)' },
    { value: '512x512', label: '512×512 (Small Square)' },
  ]

  const modelOptions = [
    { value: 'asi1-mini', label: 'ASI1 Mini' },
  ]

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            ReactJS + ASI:One Image Generation
          </h1>
          <p className="text-muted-foreground">
            Generate high-quality images from text descriptions using AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">
                Generate Image
              </h2>

              <div className="space-y-2 mb-4">
                <label htmlFor="apiKey" className="text-sm font-medium text-card-foreground">
                  API Key
                </label>
                <input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your ASI:One API key"
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              <div className="space-y-2 mb-4">
                <label htmlFor="prompt" className="text-sm font-medium text-card-foreground">
                  Prompt
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A futuristic city skyline at sunset with flying cars"
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                />
              </div>

              <div className="space-y-2 mb-4">
                <label htmlFor="size" className="text-sm font-medium text-card-foreground">
                  Image Size
                </label>
                <select
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {sizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 mb-6">
                <label htmlFor="model" className="text-sm font-medium text-card-foreground">
                  Model
                </label>
                <select
                  id="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {modelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={generateImage}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4" />
                    Generate Image
                  </>
                )}
              </Button>

              {error && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-3 text-card-foreground">
                💡 Tips for Better Results
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be specific with details about style, mood, and lighting</li>
                <li>• Include descriptive language about colors and textures</li>
                <li>• Specify camera angles and viewpoints</li>
                <li>• Mention artistic styles or reference famous artists</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border min-h-[400px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-card-foreground">
                  Generated Image
                </h2>
                {generatedImage && (
                  <Button
                    onClick={downloadImage}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-center min-h-[350px] bg-muted rounded-lg">
                {isLoading ? (
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Generating your image...</p>
                  </div>
                ) : generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Generated image"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Your generated image will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-3 text-card-foreground">
                🎨 Example Prompts
              </h3>
              <div className="space-y-2">
                {[
                  "A serene mountain landscape with snow-capped peaks and a crystal clear lake",
                  "A cyberpunk city street at night with neon lights reflecting on wet pavement",
                  "A cozy coffee shop interior with warm lighting and vintage furniture",
                  "A majestic dragon flying over a medieval castle at sunset",
                ].map((examplePrompt, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(examplePrompt)}
                    className="text-left w-full p-2 text-sm bg-muted hover:bg-muted/80 rounded border transition-colors"
                  >
                    {examplePrompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
