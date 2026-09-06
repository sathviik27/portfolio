/**
 * Real Student Profile & Portfolio Data
 * Sathvik - 1st Year B.Tech AI & ML Engineering
 * Dayananda Sagar University (DSU), Bangalore
 */

const PORTFOLIO_DATA = {
    profile: {
        name: "Sathvik",
        surname: "",
        role: "1st Year B.Tech in Artificial Intelligence & Machine Learning",
        institution: "Dayananda Sagar University (DSU), Bangalore",
        location: "Bengaluru, Karnataka, India",
        status: {
            text: "Open for Research & Summer 2027 Internships",
            available: true
        },
        bio: "First-year AI & ML undergraduate at Dayananda Sagar University, Bangalore. Passionate about computer science foundations, algorithm design, and neural architectures. Actively building projects across Python, C++, and Core Java while exploring linear algebra and deep learning from first principles.",
        stats: [
            { label: "Code Commits", value: "480+", icon: "git-commit", change: "+42 this month" },
            { label: "ML & CS Repos", value: "12+", icon: "book-open", change: "GitHub & DSU Labs" },
            { label: "Kaggle Ranking", value: "Top 18%", icon: "award", change: "Tabular Competitions" },
            { label: "Core Stack", value: "Python / C++ / Java", icon: "zap", change: "DSA & Model Dev" }
        ],
        socials: {
            github: "https://github.com/sathviik27",
            linkedin: "https://linkedin.com",
            kaggle: "https://kaggle.com",
            huggingface: "https://huggingface.co",
            twitter: "https://x.com",
            email: "sathvik.aiml@dsu.edu.in"
        }
    },

    coursework: [
        {
            title: "Data Structures & Algorithms (C++)",
            grade: "A+",
            description: "Pointers, dynamic memory allocation, trees, graphs, heaps, dynamic programming, and asymptotic time complexity.",
            icon: "code"
        },
        {
            title: "Object-Oriented Programming (Core Java)",
            grade: "A+",
            description: "Encapsulation, inheritance, polymorphism, abstract classes, interfaces, JVM memory management, and Java Collections Framework.",
            icon: "cpu"
        },
        {
            title: "Linear Algebra & Vector Calculus",
            grade: "A+",
            description: "Matrix decompositions (SVD, Eigenvalues), vector spaces, orthogonal projections, and multivariable gradient fields for ML.",
            icon: "box"
        },
        {
            title: "Python for AI & Data Science",
            grade: "A",
            description: "Vectorized computing with NumPy, data analysis with Pandas, automated pipeline scripting, and neural network prototyping in PyTorch.",
            icon: "terminal"
        }
    ],

    skillCategories: [
        {
            category: "Core Languages",
            badge: "Primary Stack",
            skills: [
                { name: "Python 3.11+ (AI / Prototyping)", level: 95, icon: "terminal" },
                { name: "C++ (DSA & Performance)", level: 88, icon: "hash" },
                { name: "Core Java (OOP & Systems)", level: 85, icon: "coffee" },
                { name: "SQL (Relational Queries)", level: 80, icon: "database" },
                { name: "Bash / Linux Shell", level: 80, icon: "monitor" }
            ]
        },
        {
            category: "AI & Machine Learning",
            badge: "Specialization",
            skills: [
                { name: "PyTorch & Neural Architectures", level: 85, icon: "flame" },
                { name: "OpenCV (Computer Vision)", level: 80, icon: "eye" },
                { name: "Scikit-Learn & Classical ML", level: 90, icon: "pie-chart" },
                { name: "NumPy & Scientific Computing", level: 92, icon: "grid" },
                { name: "Hugging Face Transformers", level: 72, icon: "smile" }
            ]
        },
        {
            category: "Foundations & Math",
            badge: "Academic Rigor",
            skills: [
                { name: "Matrix Algebra & Eigen-Systems", level: 90, icon: "box" },
                { name: "Multivariate Calculus & Optimizers", level: 88, icon: "trending-up" },
                { name: "Asymptotic Complexity & DSA", level: 85, icon: "code" },
                { name: "Probability & Inferential Statistics", level: 82, icon: "check-circle" }
            ]
        }
    ],

    projects: [
        {
            id: "vision-digit",
            title: "VisionDigit: Neural Handwritten Digit Recognizer",
            subtitle: "4-layer CNN trained on MNIST with live in-browser zero-latency inference",
            category: "Computer Vision",
            accuracy: "99.2% Test Accuracy",
            featured: true,
            image: "assets/images/project-vision.svg",
            tags: ["PyTorch", "Python", "CNN", "FastAPI", "Canvas API"],
            description: "Engineered a lightweight Convolutional Neural Network with Batch Normalization and Dropout for robust digit recognition. Built an in-browser zero-latency canvas interface for live testing.",
            metrics: [
                { label: "Model Size", value: "1.4 MB" },
                { label: "Inference Latency", value: "8.4 ms" },
                { label: "Training Epochs", value: "25" },
                { label: "Parameters", value: "142K" }
            ],
            architecture: "Input (28x28x1) -> Conv2D(32, 3x3) -> BatchNorm -> ReLU -> MaxPool(2x2) -> Conv2D(64, 3x3) -> BatchNorm -> ReLU -> MaxPool(2x2) -> Dense(128) -> Dropout(0.3) -> Softmax(10)",
            githubUrl: "https://github.com/sathviik27/vision-digit",
            liveDemoUrl: "#playground",
            isPlaygroundLinked: true
        },
        {
            id: "java-core-nn",
            title: "JavaMatrix: Core Java Tensor & Backprop Engine",
            subtitle: "Pure Java implementation of multi-dimensional matrix operations and automatic differentiation",
            category: "Core Java / AI",
            accuracy: "Zero External Dependencies",
            featured: true,
            image: "assets/images/project-ml.svg",
            tags: ["Core Java", "OOP", "Linear Algebra", "JVM Optimization"],
            description: "Built an object-oriented tensor computation and gradient backpropagation engine entirely from scratch in Core Java (JDK 21) without external libraries, leveraging Java Generics and multithreading.",
            metrics: [
                { label: "Language", value: "Java 21" },
                { label: "Dependencies", value: "0 (Pure JDK)" },
                { label: "Matrix Operations", value: "18+ Ops" },
                { label: "Test Coverage", value: "96% JUnit" }
            ],
            architecture: "Tensor2D Class -> Custom Matrix Multiplication (Strassen Algorithm) -> Computational Graph Node -> Backpropagation Pass -> SGD Optimizer",
            githubUrl: "https://github.com/sathviik27/javamatrix-engine",
            liveDemoUrl: "https://github.com/sathviik27/javamatrix-engine",
            isPlaygroundLinked: false
        },
        {
            id: "sentiment-pulse",
            title: "SentimentPulse: Real-Time Stream NLP Engine",
            subtitle: "DistilBERT fine-tuned sentiment classifier with token-level polarity heatmaps",
            category: "Natural Language Processing",
            accuracy: "94.8% F1-Score",
            featured: false,
            image: "assets/images/project-nlp.svg",
            tags: ["Python", "Hugging Face", "Transformers", "FastAPI"],
            description: "Fine-tuned DistilBERT on 50,000 product reviews to detect nuanced emotion and sentiment polarity with multi-class output (Positive, Neutral, Negative) and attention heatmaps.",
            metrics: [
                { label: "F1 Score", value: "0.948" },
                { label: "Vocabulary", value: "30,522 Tokens" },
                { label: "Quantization", value: "INT8 (4x speedup)" },
                { label: "Latency", value: "14 ms" }
            ],
            architecture: "Text Tokenizer -> DistilBERT Transformer Encoder (6 layers) -> Attention Pooling -> Linear Head -> Softmax Tri-Classification",
            githubUrl: "https://github.com/sathviik27/sentiment-pulse",
            liveDemoUrl: "#playground",
            isPlaygroundLinked: true
        },
        {
            id: "dsu-campus-rag",
            title: "DSU CourseSpark: AI Academic Tutor & RAG System",
            subtitle: "Vector search assistant indexing 1st-year engineering curriculum into ChromaDB",
            category: "Generative AI",
            accuracy: "96% Retrieval Precision",
            featured: false,
            image: "assets/images/project-rag.svg",
            tags: ["Python", "LangChain", "ChromaDB", "Vector Search"],
            description: "Developed a Retrieval-Augmented Generation (RAG) assistant indexing Dayananda Sagar University 1st-year STEM lecture notes and textbook chapters into ChromaDB for syllabus-grounded AI tutoring.",
            metrics: [
                { label: "Indexed Chunks", value: "2,400+" },
                { label: "Context Window", value: "8k Tokens" },
                { label: "Hallucination Rate", value: "< 2.0%" },
                { label: "Target Subjects", value: "Math, C++, Java" }
            ],
            architecture: "Curriculum Ingestion -> Recursive Text Splitter -> Vector Embeddings -> ChromaDB Cosine Index -> Similarity Re-ranking -> LLM Answer Synthesis",
            githubUrl: "https://github.com/sathviik27/dsu-coursespark",
            liveDemoUrl: "https://github.com/sathviik27/dsu-coursespark",
            isPlaygroundLinked: false
        }
    ],

    blogs: [
        {
            id: "backprop-from-scratch",
            title: "Demystifying Backpropagation: Building an Autograd Engine in Pure Python",
            subtitle: "A first-principles derivation of computational graphs, chain rule partial derivatives, and reverse-mode automatic differentiation.",
            date: "Feb 2026",
            readTime: "7 min read",
            category: "Deep Learning Foundations",
            thumbnail: "assets/images/blog-autograd.jpg",
            tags: ["Python", "Neural Networks", "Mathematics", "Autograd"],
            content: `
### Introduction

When I started my first year of AI & ML at Dayananda Sagar University, one of my primary goals was to look beyond high-level frameworks like PyTorch and understand what actually happens when we invoke \`loss.backward()\`.

At its core, backpropagation is nothing more than the **multivariate chain rule** applied systematically across a directed acyclic graph (DAG) of mathematical operations.

---

### The Computational Graph

Every forward pass in a neural network constructs a computational graph where:
- **Leaf nodes** represent input variables (features $x$) and learnable parameters (weights $W$, biases $b$).
- **Internal nodes** represent elementary operations ($+$, $\\times$, $\\text{ReLU}$, $\\tanh$).
- **Output node** computes the scalar loss value $\\mathcal{L}$.

\`\`\`python
class Value:
    def __init__(self, data, _children=(), _op=''):
        self.data = float(data)
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)
        self._op = _op

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other), '+')

        def _backward():
            # d(A+B)/dA = 1, d(A+B)/dB = 1
            self.grad += 1.0 * out.grad
            other.grad += 1.0 * out.grad
        out._backward = _backward
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), '*')

        def _backward():
            # d(A*B)/dA = B, d(A*B)/dB = A
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out._backward = _backward
        return out
\`\`\`

---

### Reverse-Mode Topological Sort

To compute gradients in reverse order, we perform a **topological sort** on the graph starting from the scalar output node.

\`\`\`python
def backward(self):
    topo = []
    visited = set()

    def build_topo(v):
        if v not in visited:
            visited.add(v)
            for child in v._prev:
                build_topo(child)
            topo.append(v)

    build_topo(self)
    self.grad = 1.0  # Base case: dL/dL = 1.0

    for node in reversed(topo):
        node._backward()
\`\`\`

---

### Key Takeaways
1. Gradients accumulate through the chain rule ($\`\\frac{\\partial \\mathcal{L}}{\\partial x} = \\sum \\frac{\\partial \\mathcal{L}}{\\partial y_i} \\cdot \\frac{\\partial y_i}{\\partial x}\`$).
2. Vectorized implementations (like PyTorch tensors) apply this exact same graph traversal over multi-dimensional Jacobians.
3. Writing autograd from scratch provides an invaluable mental model for debugging gradient vanishing and explosion in deep networks.
            `
        },
        {
            id: "cpp-vs-core-java",
            title: "C++ vs. Core Java for 1st-Year CS Students: Memory, OOP, and Performance",
            subtitle: "Comparing pointer mechanics and RAII in C++ with JVM garbage collection and class hierarchies in Java.",
            date: "Jan 2026",
            readTime: "6 min read",
            category: "Computer Science",
            thumbnail: "assets/images/blog-systems.jpg",
            tags: ["C++", "Core Java", "Memory Management", "DSA"],
            content: `
### Why Master Both C++ and Java?

In our first-year computer science curriculum, mastering both **C++** and **Core Java** forms the bedrock of systems programming and scalable software engineering.

While both languages share C-style syntax, their underlying execution models, memory management paradigms, and object-oriented abstractions differ fundamentally.

---

### 1. Memory Management: Manual Pointers vs. JVM Garbage Collection

In C++, developers have deterministic control over the stack and heap:

\`\`\`cpp
// C++: Deterministic Resource Acquisition Is Initialization (RAII)
#include <iostream>
#include <memory>

class TensorBuffer {
    int* data;
    size_t size;
public:
    TensorBuffer(size_t n) : size(n), data(new int[n]) {
        std::cout << "Buffer allocated on Heap\\n";
    }
    ~TensorBuffer() {
        delete[] data; // Deterministic deallocation
        std::cout << "Buffer freed automatically on scope exit\\n";
    }
};
\`\`\`

In Java, all non-primitive objects reside on the heap and are managed by the JVM's Garbage Collector (G1 / ZGC):

\`\`\`java
// Java: Automatic Garbage Collection & Safe References
public class TensorBuffer {
    private final int[] data;

    public TensorBuffer(int size) {
        this.data = new int[size]; // Allocated on JVM Heap
    }
    // No explicit destructor; GC automatically reclaims unreachable references
}
\`\`\`

---

### 2. Performance in AI & Systems

- **C++**: Generates direct machine code with zero runtime overhead. Preferred for deep learning runtimes (TensorRT, ONNX Runtime, CUDA kernels).
- **Core Java**: Compiles to bytecode and utilizes Just-In-Time (JIT) compilation. Ideal for enterprise microservices, robust backend pipelines, and distributed data systems (Apache Spark, Kafka).

---

### Conclusion
Understanding C++ teaches you how the computer hardware actually operates with memory addresses and cache lines. Understanding Core Java teaches you disciplined object-oriented architecture, modularity, and large-scale application design.
            `
        },
        {
            id: "linear-transformations-ml",
            title: "Linear Transformations as Neural Layers: A Geometric Perspective",
            subtitle: "How matrix multiplication geometrically stretches, rotates, and projects feature spaces in machine learning.",
            date: "Dec 2025",
            readTime: "5 min read",
            category: "Mathematics for ML",
            thumbnail: "assets/images/blog-geometry.jpg",
            tags: ["Linear Algebra", "Geometry", "PyTorch", "Calculus"],
            content: `
### The Geometry of Matrix Multiplication

When we write \`y = W @ x + b\` in PyTorch, it is tempting to view it simply as algebraic dot products. But geometrically, every dense linear layer performs a **spatial transformation** of vector coordinates.

---

### Coordinate Deformations

Consider a 2D vector $\\mathbf{x} \\in \\mathbb{R}^2$. Multiplying by a $2 \\times 2$ matrix $W$:
1. **Rotates** the coordinate grid lines.
2. **Scales** vectors along the principal eigenvector axes by eigenvalue magnitudes $\\lambda_i$.
3. **Shears** the space relative to the basis axes.

\`\`\`
   [x1]               [w11  w12] [x1]               [y1]
   [  ]  =======>     [        ] [  ]  =======>     [  ]
   [x2]               [w21  w22] [x2]               [y2]
 (Input Space)        (Transformation Matrix)    (Deformed Feature Space)
\`\`\`

---

### Why Non-Linear Activations (ReLU) are Mandatory

If we stack two linear layers without a non-linear activation function:
$$\\mathbf{y} = W_2 (W_1 \\mathbf{x}) = (W_2 W_1) \\mathbf{x} = W_{\\text{combined}} \\mathbf{x}$$

The composition of two linear transformations is strictly another linear transformation. It cannot fold or bend the space to separate non-linearly separable classes (such as XOR).

The activation function (like $\\text{ReLU}(z) = \\max(0, z)$) introduces a "hinge" into the space, allowing the neural network to fold Euclidean space and partition complex decision boundaries.

---

### Summary
Linear layers **warp, rotate, and project** feature spaces; non-linearities **fold and carve** the space to solve complex classification manifolds.
            `
        }
    ],

    roadmap: [
        {
            year: "Year 1 (Dayananda Sagar University)",
            badge: "Current 🟢",
            status: "current",
            title: "Foundational CS, Mathematics & Deep Learning Basics",
            milestones: [
                "Mastered Data Structures & Algorithms in C++ and Object-Oriented Design in Core Java",
                "Built custom Neural Network and autograd graph from scratch in pure Python",
                "Implemented pure Core Java Matrix & Tensor calculation library (JavaMatrix)",
                "Competed in Kaggle Tabular Competitions (Top 18%)",
                "Maintaining high academic standing in 1st-Year Engineering at DSU"
            ]
        },
        {
            year: "Year 2",
            badge: "Upcoming 🎯",
            status: "future",
            title: "Computer Vision, Transformers & Open-Source Engineering",
            milestones: [
                "Deep dive into Vision Transformers (ViT) & Diffusion Models in PyTorch",
                "Contribute to open-source ML/Java repositories and publish technical writeups",
                "Build scalable backend services integrating C++ inference with Java/Python APIs",
                "Secure Summer 2027 Research / Machine Learning Internship"
            ]
        },
        {
            year: "Year 3 & 4",
            badge: "Vision 🚀",
            status: "future",
            title: "Distributed AI Systems, LLMs & Autonomous Agents",
            milestones: [
                "Master model quantization (INT4/INT8), TensorRT, and distributed GPU training",
                "Deploy production-grade multi-modal AI systems and vector databases",
                "Publish undergraduate research preprint and complete state-of-the-art capstone project"
            ]
        }
    ],

    certifications: [
        {
            name: "Deep Learning Specialization",
            issuer: "DeepLearning.AI",
            date: "Nov 2025",
            skills: "Neural Networks, Backprop, CNNs, Hyperparameter Optimization"
        },
        {
            name: "Mathematics for Machine Learning",
            issuer: "Imperial College London",
            date: "Jan 2026",
            skills: "Linear Algebra, Vector Calculus, PCA, Eigenvalues"
        },
        {
            name: "Data Structures & Algorithms in C++",
            issuer: "Dayananda Sagar University / NPTEL",
            date: "Dec 2025",
            skills: "Trees, Graphs, Pointers, Memory Management, Sorting"
        }
    ]
};
