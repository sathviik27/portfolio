/**
 * Real Student Profile & Portfolio Data
 * Sathvik - 1st Year B.Tech AI & ML Engineering
 * Dayananda Sagar University (DSU), Bangalore
 */

const PORTFOLIO_DATA = {
    profile: {
        name: "Sathvik",
        role: "1st Year B.Tech in Artificial Intelligence & Machine Learning",
        institution: "Dayananda Sagar University (DSU), Bangalore",
        location: "Bengaluru, Karnataka, India",
        status: {
            text: "Open for Academic Research & Technical Collaborations",
            available: true
        },
        bio: "First-year AI & ML undergraduate at Dayananda Sagar University, Bangalore. Passionate about computer science foundations, algorithm design, and neural architectures. Actively mastering core programming across Python, C++, and Core Java while exploring linear algebra and deep learning from first principles.",
        quote: "Learn the mechanics before the abstractions. Understand every pointer in C++, every object hierarchy in Java, and every partial derivative in backpropagation.",
        quoteAuthor: "Sathvik • Dayananda Sagar University (DSU)",
        socials: {
            github: "https://github.com/sathviik27",
            linkedin: "https://www.linkedin.com/in/sathvik-r27/",
            kaggle: "https://github.com/sathviik27",
            huggingface: "https://huggingface.co",
            twitter: "https://x.com",
            email: "sathvik.aiml@dsu.edu.in"
        }
    },

    coursework: [
        {
            title: "Data Structures & Algorithms (C++)",
            grade: "Core Focus",
            description: "Pointers, dynamic memory allocation (RAII), asymptotic time complexity O(N log N), binary search trees, heaps, graphs, and dynamic programming.",
            icon: "code"
        },
        {
            title: "Object-Oriented Programming (Core Java)",
            grade: "Core Focus",
            description: "Encapsulation, inheritance, polymorphism, abstract interfaces, JVM heap/stack architecture, garbage collection, and Java Collections Framework.",
            icon: "cpu"
        },
        {
            title: "Linear Algebra & Vector Calculus",
            grade: "Math Rigor",
            description: "Matrix decompositions (SVD, Eigenvalues), vector spaces, linear transformations, dot products, and multivariate gradient fields for machine learning.",
            icon: "box"
        },
        {
            title: "Python for AI & Scientific Compute",
            grade: "AI Stack",
            description: "Vectorized array computations with NumPy, structured data processing with Pandas, and neural network prototyping in PyTorch.",
            icon: "terminal"
        }
    ],

    toolkit: {
        systems: {
            category: "Core Systems & Algorithmic Languages",
            subtitle: "Low-level mechanics, memory architectures, and disciplined object-oriented engineering",
            badge: "Primary Stack",
            items: [
                {
                    name: "C++ (C++20 / STL)",
                    level: "High Performance & DSA",
                    desc: "Pointer arithmetic, manual memory allocation, RAII patterns, Standard Template Library (STL), graph algorithms, and asymptotic complexity analysis.",
                    icon: "cpp",
                    tags: ["Pointers & Memory", "STL Containers", "Graph Algorithms", "O(N log N) Optimization"]
                },
                {
                    name: "Core Java (JDK 21)",
                    level: "OOP & Systems Architecture",
                    desc: "Class hierarchies, abstract design patterns, polymorphism, Java Collections Framework (HashMaps, Trees, Lists), Generics, and JVM memory lifecycle.",
                    icon: "java",
                    tags: ["OOP Architecture", "Collections API", "JVM Lifecycle", "Generics & Streams"]
                },
                {
                    name: "Python 3.11+",
                    level: "AI Modeling & Scientific Compute",
                    desc: "Vectorized tensor computations, mathematical modeling, automated data pipelines, and deep neural network prototyping with PyTorch.",
                    icon: "python",
                    tags: ["NumPy Vectorization", "PyTorch Prototyping", "Scientific Compute", "Scripting Automation"]
                },
                {
                    name: "SQL & Relational Schemas",
                    level: "Data Storage & Querying",
                    desc: "Relational database schema modeling, ACID transactions, complex multi-table joins, subqueries, and B-tree index query optimization.",
                    icon: "database",
                    tags: ["Relational Modeling", "Joins & Aggregations", "Indexing", "ACID Compliance"]
                }
            ]
        },
        ai: {
            category: "Machine Learning & Deep Learning",
            subtitle: "Neural architectures, mathematical optimization, and computer vision pipelines",
            badge: "Specialization",
            items: [
                {
                    name: "PyTorch Deep Learning",
                    level: "Neural Architectures",
                    desc: "Building and training neural models using dynamic computational graphs (Autograd), convolutional layers (CNNs), Dropout, and AdamW/SGD optimizers.",
                    icon: "pytorch",
                    tags: ["Autograd Graphs", "CNN Convolutions", "Loss Functions", "Model Training"]
                },
                {
                    name: "NumPy & Scikit-Learn",
                    level: "Classical ML & Vectors",
                    desc: "Vectorized linear algebra, broadcast operations, feature scaling, regression, SVM classifiers, random forests, and PCA dimensionality reduction.",
                    icon: "scikit",
                    tags: ["Matrix Vectorization", "Classification & Regression", "PCA Decompositions", "Feature Engineering"]
                },
                {
                    name: "OpenCV (Computer Vision)",
                    level: "Image Processing",
                    desc: "Spatial kernel filtering, morphological transformations, Sobel/Canny edge detection, contour analysis, and bounding-box normalization.",
                    icon: "opencv",
                    tags: ["Kernel Convolutions", "Edge Detection", "Morphology", "Pixel Transformations"]
                },
                {
                    name: "Transformers & NLP",
                    level: "Attention & Embeddings",
                    desc: "Understanding self-attention mechanisms, subword tokenization (BPE/WordPiece), Hugging Face pipelines, and dense semantic vector representations.",
                    icon: "transformers",
                    tags: ["Self-Attention", "Tokenizers", "Dense Embeddings", "Hugging Face"]
                }
            ]
        },
        mathematics: {
            category: "Mathematical Foundations for AI",
            subtitle: "First-principles mathematical intuition underpinning modern learning algorithms",
            badge: "Academic Rigor",
            items: [
                {
                    name: "Linear Algebra & Matrix Decompositions",
                    level: "Foundational Math",
                    desc: "Vector spaces, basis transformations, dot products, projection manifolds, eigenvalues/eigenvectors, and Singular Value Decomposition (SVD).",
                    icon: "matrix",
                    tags: ["SVD Decomposition", "Eigenvalues", "Vector Spaces", "Orthogonal Projections"]
                },
                {
                    name: "Multivariate Calculus & Optimization",
                    level: "Optimization Math",
                    desc: "Partial derivatives, Jacobian matrices, gradient vectors, Hessian curvature, and the multivariate chain rule driving reverse-mode autodiff.",
                    icon: "calculus",
                    tags: ["Gradient Fields", "Multivariate Chain Rule", "Jacobian Matrices", "Loss Contours"]
                },
                {
                    name: "Probability & Inferential Statistics",
                    level: "Statistical Theory",
                    desc: "Probability distributions (Gaussian, Bernoulli), Bayes' theorem, maximum likelihood estimation (MLE), variance, and statistical hypothesis testing.",
                    icon: "stats",
                    tags: ["Bayes' Theorem", "Gaussian Distributions", "MLE Estimation", "Statistical Inference"]
                }
            ]
        },
        toolchain: {
            category: "Engineering Toolchain & Research Stack",
            subtitle: "Disciplined software practices, version control, and Linux environments",
            badge: "Developer Workflow",
            items: [
                {
                    name: "Git & GitHub Version Control",
                    level: "Collaboration & Workflow",
                    desc: "Distributed revision tracking, feature branching, merge conflict resolution, semantic commit messages, and collaborative open-source workflows.",
                    icon: "git",
                    tags: ["Branching Workflows", "Semantic Commits", "Diff Analysis", "Remote Sync"]
                },
                {
                    name: "Linux / Ubuntu Environment",
                    level: "Systems & CLI",
                    desc: "POSIX command line navigation, Bash shell scripting, environment variables, process management, and Unix filesystem permissions.",
                    icon: "linux",
                    tags: ["POSIX Shell", "Bash Scripting", "Process Management", "Package Systems"]
                },
                {
                    name: "Scientific Notebooks & IDEs",
                    level: "Research & Development",
                    desc: "Interactive algorithm prototyping in VS Code and Jupyter Lab, virtual environment isolation (venv/conda), and debugging tools.",
                    icon: "terminal",
                    tags: ["VS Code", "Jupyter Lab", "Virtual Environments", "GDB Debugging"]
                }
            ]
        }
    },

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
            self.grad += 1.0 * out.grad
            other.grad += 1.0 * out.grad
        out._backward = _backward
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), '*')

        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out._backward = _backward
        return out
\`\`\`

---

### Reverse-Mode Autodiff: Topological Sort

To propagate gradients backwards, we must traverse the nodes in **reverse topological order**, ensuring that when we compute the gradient for any node, all nodes that depend on it have already accumulated their gradients.

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
    self.grad = 1.0
    for node in reversed(topo):
        node._backward()
\`\`\`

---

### Conclusion & Key Takeaways

1. Modern deep learning frameworks are high-performance graph compilers.
2. Understanding the chain rule from first principles eliminates the "magic" of deep learning.
3. Every parameter update via gradient descent follows this exact mechanical chain.
            `
        },
        {
            id: "cpp-vs-java-memory",
            title: "Memory Architectures: C++ Manual Allocation vs Java JVM Garbage Collection",
            subtitle: "A comparative deep-dive into pointers, cache locality, RAII, stack vs heap allocation, and the JVM ZGC collector.",
            date: "Jan 2026",
            readTime: "9 min read",
            category: "Systems & Architecture",
            thumbnail: "assets/images/blog-systems.jpg",
            tags: ["C++", "Core Java", "JVM", "Memory Management"],
            content: `
### The Dual Paradigm

In our first-year computer science coursework at Dayananda Sagar University, we study both **C++** and **Core Java**. Comparing how both languages manage physical hardware memory provides profound insights into systems programming and AI runtime engines.

---

### 1. C++: Explicit Ownership & RAII

In C++, memory is explicit. Developers control allocation on both the stack (automatic lifetime) and the free store/heap (\`new\` / \`malloc\`).

\`\`\`cpp
#include <iostream>
#include <memory>

class TensorBuffer {
    size_t size;
    float* data;
public:
    TensorBuffer(size_t s) : size(s), data(new float[s]) {
        std::cout << "Allocated " << size * sizeof(float) << " bytes on heap\\n";
    }
    ~TensorBuffer() {
        delete[] data;
        std::cout << "Freed memory deterministically via RAII\\n";
    }
};
\`\`\`

**Key advantage:** Deterministic destruction without garbage collection pauses. This is why high-performance deep learning runtimes (TensorRT, ONNX Runtime, libtorch) are written in C++.

---

### 2. Core Java: JVM Managed Heap & Generational GC

Java abstracts memory behind reference semantics. All objects are allocated on the JVM managed heap, while primitive values and references live on thread stacks.

\`\`\`java
public class MatrixNode {
    private final double[][] matrix;
    private final int rows, cols;

    public MatrixNode(int rows, int cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = new double[rows][cols]; // Allocated on Eden space
    }
}
\`\`\`

### Comparison Summary

| Metric | C++ (Native) | Core Java (JVM) |
| :--- | :--- | :--- |
| **Allocation** | Stack or Heap (\`malloc\` / \`new\`) | Heap only (JVM Eden space) |
| **Deallocation** | Deterministic (RAII / \`delete\`) | Non-deterministic (Garbage Collector) |
| **Cache Locality** | Contiguous memory arrays | Pointer chasing across heap |
| **Safety** | Undefined behavior on leaks | Memory safe (no segmentation faults) |
            `
        },
        {
            id: "linear-algebra-for-ml",
            title: "The Geometry of Tensors: Why Linear Algebra is the True Language of AI",
            subtitle: "Visualizing matrix transformations, eigenvectors, eigenvalues, and SVD as geometric operations on high-dimensional manifolds.",
            date: "Dec 2025",
            readTime: "6 min read",
            category: "Mathematics for ML",
            thumbnail: "assets/images/blog-geometry.jpg",
            tags: ["Linear Algebra", "Mathematics", "Machine Learning", "SVD"],
            content: `
### Vectors are Points in Space

Every input to a machine learning model—whether a pixel grid, an audio waveform, or a word embedding—is represented as a coordinate in high-dimensional vector space $\\mathbb{R}^n$.

---

### Matrices as Linear Transformations

A matrix $A \\in \\mathbb{R}^{m \\times n}$ does not merely store numbers; it represents a **geometric transformation** of space:
1. It stretches or compresses space along specific directions.
2. It rotates space around an axis.
3. It projects space into lower or higher dimensions.

$$\\mathbf{y} = A\\mathbf{x}$$

When we pass an activation vector through a dense layer in a neural network:

$$\\mathbf{h} = \\sigma(W\\mathbf{x} + \\mathbf{b})$$

We are applying a linear shear and rotation ($W\\mathbf{x}$), translating the origin ($+\\mathbf{b}$), and bending the space non-linearly ($\\sigma$).

---

### Singular Value Decomposition (SVD)

Any real matrix $A$ can be factored into three geometric operations:

$$A = U \\Sigma V^T$$

- **$V^T$**: Rotation in the domain space
- **$\\Sigma$**: Scaling along coordinate axes by singular values $\\sigma_i$
- **$U$**: Rotation into the range space

This single decomposition provides the theoretical foundation for Principal Component Analysis (PCA), low-rank matrix approximation, and LLM model compression (LoRA).
            `
        }
    ]
};
