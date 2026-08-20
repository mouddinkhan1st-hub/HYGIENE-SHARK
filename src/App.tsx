import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  CircleHelp,
  Droplets,
  Leaf,
  Menu,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smile,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import "./index.css";

type Product = {
  slug: string;
  price: number;
  name: string;
  category: string;
  pack: string;
  note: string;
  tone: "ice" | "aloe" | "miswak";
  image?: string;
};
type CartItem = {
  slug: string;
  quantity: number;
};
const products: Product[] = [
  {
    slug: "natural-alum-block",
    price: 12.99,
    name: "Natural Alum Block",
    category: "Alum Body Care",
    pack: "Single block",
    note: "A mineral-based daily ritual",
    tone: "ice",
    image: "/assets/natural-alum.png",
  },
  {
    slug: "aloe-vera-alum-block",
    price: 12.99,
    name: "Aloe Vera Alum Block",
    category: "Alum Body Care",
    pack: "Single block",
    note: "A fresh take on the alum ritual",
    tone: "aloe",
    image: "/assets/aloe-alum.jpeg",
  },
  {
    slug: "natural-miswak-3-pack",
    price: 9.99,
    name: "Natural Miswak",
    category: "Miswak Oral Care",
    pack: "3-Piece Pack",
    note: "Traditional oral care, made simple",
    tone: "miswak",
    image: "/assets/miswak-3-pack.png",
  },
  {
    slug: "natural-miswak-6-pack",
    price: 14.99,
    name: "Natural Miswak",
    category: "Miswak Oral Care",
    pack: "6-Piece Pack",
    note: "The ritual-ready multipack",
    tone: "miswak",
    image: "/assets/miswak-6-pack.png",
  },
];
function ProductVisual({ product }: { product: Product }) {
  return (
    <div className="product-visual photo">
      <img src={product.image} alt={`${product.name} ${product.pack}`} />
    </div>
  );
}

const officialListingMedia: Record<string, string[]> = {
  "natural-alum-block": Array.from(
    { length: 8 },
    (_, i) =>
      `/assets/amazon-official/natural/${String(i + 1).padStart(2, "0")}.jpg`,
  ),
  "aloe-vera-alum-block": Array.from(
    { length: 9 },
    (_, i) =>
      `/assets/amazon-official/aloe/${String(i + 1).padStart(2, "0")}.jpg`,
  ),
};
const aPlusMedia: Record<string, string[]> = {
  "natural-alum-block": Array.from(
    { length: 5 },
    (_, i) =>
      `/assets/product-detail/natural_aplus/${String(i + 1).padStart(2, "0")}.png`,
  ),
  "aloe-vera-alum-block": ["01", "03", "05", "07", "10", "11"].map(
    number => `/assets/product-detail/aloe_aplus/${number}.png`,
  ),
};

function SiteHeader({
  cart,
  menu,
  setMenu,
}: {
  cart: number;
  menu: boolean;
  setMenu: (v: boolean) => void;
}) {
  return (
    <header className="nav inner-nav">
      <a className="logo" href="/">
        <img src="/assets/hygiene-shark-wordmark.png" alt="Hygiene Shark" />
      </a>
      <nav className={menu ? "open" : ""}>
        <a href="/shop">Shop</a>
        <a href="/learn">Learn</a>
        <a href="/story">Our Story</a>
      </nav>
      <div className="nav-actions">
        <button
          aria-label="Search"
          onClick={() =>
            toast("Search will connect when the catalog is finalized")
          }
        >
          <Search />
        </button>
        <a
          className="cart route-cart"
          aria-label={`Cart with ${cart} items`}
          href="/cart"
        >
          <ShoppingBag />
          <span>{cart}</span>
        </a>
        <button
          className="menu"
          aria-label="Toggle menu"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer>
      <div>
        <img src="/assets/hygiene-shark-wordmark.png" alt="Hygiene Shark" />
        <p>
          Time-tested hygiene essentials,
          <br />
          rebuilt for modern life.
        </p>
        <p>
          LYSTRA LLC
          <br />
          5830 E 2nd St Ste 7000
          <br />
          Casper, WY 82609, USA
        </p>
      </div>
      <div>
        <b>Shop</b>
        <a href="/shop">All products</a>
        <a href="/cart">Cart</a>
        <a href="/contact">Contact</a>
      </div>
      <div>
        <b>Information</b>
        <a href="/faq">FAQ</a>
        <a href="/shipping-returns">Shipping & Returns</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms & Conditions</a>
      </div>
      <div className="signoff">
        <span>Ready is a ritual.</span>
        <strong>Forever Prepped.</strong>
      </div>
    </footer>
  );
}

function ProductPage({
  product,
  cart,
  add,
  menu,
  setMenu,
}: {
  product: Product;
  cart: number;
  add: (p: Product) => void;
  menu: boolean;
  setMenu: (v: boolean) => void;
}) {
  const media = officialListingMedia[product.slug] ?? [product.image ?? ""];
  const aPlus = aPlusMedia[product.slug] ?? [];
  const [active, setActive] = useState(media[0]);
  const isAlum = product.category.includes("Alum");
  return (
    <div className="site-shell product-page">
      <SiteHeader cart={cart} menu={menu} setMenu={setMenu} />
      <main>
        <section className="pdp-top">
          <div className="pdp-gallery">
            <div className="pdp-thumbs">
              {media.slice(0, 8).map(src => (
                <button
                  className={src === active ? "active" : ""}
                  key={src}
                  onClick={() => setActive(src)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
            <img
              className="pdp-main-image"
              src={active}
              alt={`${product.name} ${product.pack}`}
            />
          </div>
          <div className="pdp-buy">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="pdp-pack">{product.pack}</p>
            <p className="pdp-desc">
              {isAlum
                ? "A focused alum-block ritual presented with clear, practical guidance for modern personal care."
                : "Natural Miswak in a simple multipack format. Detailed preparation and use education will be added as the launch content is approved."}
            </p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="pdp-add" onClick={() => add(product)}>
              Add to cart <ShoppingBag />
            </button>
            {isAlum && (
              <a
                className="amazon-link"
                href={
                  product.slug.includes("aloe")
                    ? "https://a.co/d/0fUpUDdy"
                    : "https://a.co/d/041IVfLl"
                }
                target="_blank"
                rel="noreferrer"
              >
                Also available on Amazon <ArrowRight />
              </a>
            )}
            <ul>
              <li>Focused single-product format</li>
              <li>Clear education before use</li>
              <li>Final shipping and returns shown before launch</li>
            </ul>
          </div>
        </section>
        {isAlum ? (
          <section className="pdp-amazon pdp-aplus">
            <header>
              <p className="eyebrow">The full ritual.</p>
              <h2>More about your Alum Block.</h2>
            </header>
            <div className="aplus-stack">
              {aPlus.map((src, index) => (
                <img
                  src={src}
                  alt={`${product.name} product story ${index + 1}`}
                  key={src}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="miswak-simple">
            <img src={product.image} alt={`${product.name} ${product.pack}`} />
            <div>
              <p className="eyebrow">Ancient oral care. Modern performance.</p>
              <h2>A simple start.</h2>
              <p>
                For launch, this page uses the approved front image and
                essential pack information only. Richer product education and
                gallery assets can be added after the core store is live.
              </p>
              <a className="btn ghost" href="/learn">
                Learn the ritual <ArrowRight />
              </a>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
      <Toaster theme="dark" position="bottom-center" richColors />
    </div>
  );
}

function CartPage({
  items,
  setItems,
  menu,
  setMenu,
}: {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  menu: boolean;
  setMenu: (v: boolean) => void;
}) {
  const cart = items.reduce((sum, item) => sum + item.quantity, 0);
  const lines = items.flatMap(item => {
    const product = products.find(p => p.slug === item.slug);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );
  const updateQuantity = (slug: string, quantity: number) =>
    setItems(
      quantity <= 0
        ? items.filter(item => item.slug !== slug)
        : items.map(item => (item.slug === slug ? { ...item, quantity } : item)),
    );
  return (
    <div className="site-shell core-page">
      <SiteHeader cart={cart} menu={menu} setMenu={setMenu} />
      <main className="cart-page">
        <p className="eyebrow">Your cart.</p>
        <h1>{cart ? "Ready when you are." : "Your cart is empty."}</h1>
        {cart ? (
          <div className="cart-layout">
            <section>
              {lines.map(({ product, quantity }) => (
                <div className="cart-line" key={product.slug}>
                  <img src={product.image} alt={`${product.name} ${product.pack}`} />
                  <div>
                    <h2>{product.name}</h2>
                    <p>{product.pack} · ${product.price.toFixed(2)}</p>
                    <div className="qty">
                      <button
                        aria-label={`Remove one ${product.name}`}
                        onClick={() => updateQuantity(product.slug, quantity - 1)}
                      >
                        <Minus />
                      </button>
                      <span>{quantity}</span>
                      <button
                        aria-label={`Add one ${product.name}`}
                        onClick={() => updateQuantity(product.slug, quantity + 1)}
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
            <aside>
              <h2>Order summary</h2>
              <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
              <p>Shipping and tax are calculated after checkout is activated.</p>
              <button
                onClick={() =>
                  toast(
                    "Checkout activates after Stripe and shipping rules are connected",
                  )
                }
              >
                Continue to secure checkout <ArrowRight />
              </button>
            </aside>
          </div>
        ) : (
          <a className="btn primary" href="/shop">
            Shop the essentials <ArrowRight />
          </a>
        )}
      </main>
      <SiteFooter />
      <Toaster theme="dark" position="bottom-center" richColors />
    </div>
  );
}

const pageContent: Record<
  string,
  { title: string; intro: string; body: string[] }
> = {
  "/shipping-returns": {
    title: "Shipping & Returns",
    intro: "Clear expectations before every order.",
    body: [
      "U.S. shipping rates, free-shipping threshold and delivery estimates will be published here before checkout goes live.",
      "The return and refund window, eligibility requirements and contact process will be finalized before launch.",
    ],
  },
  "/contact": {
    title: "Contact Hygiene Shark",
    intro: "Questions about products, orders or routines?",
    body: [
      "Email: hygienesharkviktor1@gmail.com",
      "LYSTRA LLC · Mailing address: 5830 E 2nd St Ste 7000, Casper, WY 82609, USA",
    ],
  },
  "/privacy": {
    title: "Privacy Policy",
    intro: "How customer information is handled.",
    body: [
      "The final policy will explain data collected through checkout, payments, analytics and customer support.",
      "Stripe payment details and the production website’s cookie tools must be connected before this policy is finalized.",
    ],
  },
  "/terms": {
    title: "Terms & Conditions",
    intro: "The rules for using this website and purchasing products.",
    body: [
      "Final terms will cover orders, pricing, availability, intellectual property, acceptable use and limitations.",
      "The store is operated by LYSTRA LLC. Governing terms and ecommerce configuration must be confirmed before publication.",
    ],
  },
  "/faq": {
    title: "Frequently Asked Questions",
    intro: "Quick answers for a simpler routine.",
    body: [
      "What is alum? A mineral-based block used as part of a personal-care ritual.",
      "What is Miswak? An oral-care stick from the Salvadora persica tree.",
      "How do I use them? Approved step-by-step instructions will be available on each final product page.",
      "When will checkout work? After prices, shipping rules and Stripe are connected.",
    ],
  },
  "/checkout": {
    title: "Secure Checkout",
    intro: "Checkout is prepared for payment connection.",
    body: [
      "Stripe, final product prices, shipping rules and tax settings must be connected before customers can place real orders.",
      "No payment details are collected in this preview.",
    ],
  },
  "/thank-you": {
    title: "Order Confirmed",
    intro: "You’re prepped.",
    body: [
      "After Stripe is connected, customers will see their order number, receipt and delivery details here.",
    ],
  },
};

function InfoPage({
  path,
  cart,
  menu,
  setMenu,
}: {
  path: string;
  cart: number;
  menu: boolean;
  setMenu: (v: boolean) => void;
}) {
  const data = pageContent[path];
  return (
    <div className="site-shell core-page">
      <SiteHeader cart={cart} menu={menu} setMenu={setMenu} />
      <main className="info-page">
        <p className="eyebrow">Hygiene Shark.</p>
        <h1>{data.title}</h1>
        <h2>{data.intro}</h2>
        {data.body.map(p => (
          <p key={p}>{p}</p>
        ))}
        {path === "/contact" && (
          <a
            className="btn primary"
            href="mailto:hygienesharkviktor1@gmail.com"
          >
            Email us <ArrowRight />
          </a>
        )}
        <p className="policy-note">
          Launch draft · Final operational and legal details pending approval.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

function ShopPage({
  cart,
  add,
  menu,
  setMenu,
}: {
  cart: number;
  add: (p: Product) => void;
  menu: boolean;
  setMenu: (value: boolean) => void;
}) {
  const [filter, setFilter] = useState<"all" | "alum" | "miswak">("all");
  const shown = products.filter(
    p =>
      filter === "all" ||
      (filter === "alum"
        ? p.category.includes("Alum")
        : p.category.includes("Miswak")),
  );
  return (
    <div className="site-shell shop-page">
      <div className="shipping-strip">
        Four focused essentials · Built for modern routines
      </div>
      <header className="nav shop-nav">
        <a className="logo" href="/" aria-label="Hygiene Shark home">
          <img src="/assets/hygiene-shark-wordmark.png" alt="Hygiene Shark" />
        </a>
        <nav className={menu ? "open" : ""} aria-label="Main navigation">
          <a className="active" href="/shop">
            Shop
          </a>
          <a href="/learn">Learn</a>
          <a href="/story">Our Story</a>
        </nav>
        <div className="nav-actions">
          <button
            aria-label="Search"
            onClick={() =>
              toast("Search will connect when the catalog is finalized")
            }
          >
            <Search />
          </button>
          <button
            className="cart"
            aria-label={`Cart with ${cart} items`}
            onClick={() =>
              toast(`${cart} item${cart === 1 ? "" : "s"} in your cart`)
            }
          >
            <ShoppingBag />
            <span>{cart}</span>
          </button>
          <button
            className="menu"
            aria-label="Toggle menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main className="shop-main">
        <section className="shop-intro">
          <p className="eyebrow">Shop</p>
          <h1>Shop Hygiene Shark</h1>
          <p>
            Clean. Confident. Ready. Choose the essentials that fit your
            routine.
          </p>
          <div className="shop-toolbar">
            <div className="filters" role="group" aria-label="Product filters">
              <button
                className={filter === "all" ? "selected" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={filter === "alum" ? "selected" : ""}
                onClick={() => setFilter("alum")}
              >
                Alum body care
              </button>
              <button
                className={filter === "miswak" ? "selected" : ""}
                onClick={() => setFilter("miswak")}
              >
                Oral care
              </button>
            </div>
            <button
              className="sort-button"
              onClick={() =>
                toast("Sorting will activate with the live catalog")
              }
            >
              Sort: Featured <ChevronDown />
            </button>
          </div>
        </section>
        <section className="shop-product-grid" aria-live="polite">
          {shown.map(p => (
            <article className="shop-product-card" key={`${p.name}-${p.pack}`}>
              <ProductVisual product={p} />
              <div className="shop-product-copy">
                <p className="category-label">{p.category}</p>
                <h2>
                  {p.name}
                  {p.category.includes("Miswak") ? ` ${p.pack}` : ""}
                </h2>
                <p>{p.note}</p>
                <p className="product-price">${p.price.toFixed(2)}</p>
                <button onClick={() => add(p)}>
                  Add to cart <ShoppingBag />
                </button>
                <a className="details" href={`/products/${p.slug}`}>
                  View details <ArrowRight />
                </a>
              </div>
            </article>
          ))}
        </section>
        <section className="chooser">
          <h2>Which one is for me?</h2>
          <div>
            {products.map((p, i) => (
              <article key={`${p.name}-guide`}>
                <span>0{i + 1}</span>
                <h3>
                  {p.name}
                  {p.category.includes("Miswak") ? ` ${p.pack}` : ""}
                </h3>
                <p>{p.note}. Choose the format that best fits your routine.</p>
              </article>
            ))}
          </div>
        </section>
        <section className="shop-note">
          <p className="eyebrow">The essentials, clearly explained.</p>
          <h2>
            No crowded shelves.
            <br />
            No confusing choices.
          </h2>
          <p>
            Four focused products across two time-tested rituals. Detailed use
            instructions, final prices, shipping information and verified
            product claims will be added before launch.
          </p>
          <a className="btn primary" href="/learn">
            Learn the rituals <ArrowRight />
          </a>
        </section>
      </main>
      <footer>
        <div>
          <img src="/assets/hygiene-shark-wordmark.png" alt="Hygiene Shark" />
          <p>
            Time-tested hygiene essentials,
            <br />
            rebuilt for modern life.
          </p>
        </div>
        <div>
          <b>Shop</b>
          <a href="/shop">All products</a>
          <a href="/shop">Alum body care</a>
          <a href="/shop">Miswak oral care</a>
        </div>
        <div>
          <b>Learn</b>
          <a href="/learn">The rituals</a>
          <a href="/#story">Our story</a>
          <a href="/#top">FAQs</a>
        </div>
        <div className="signoff">
          <span>Ready is a ritual.</span>
          <strong>Forever Prepped.</strong>
        </div>
      </footer>
      <Toaster theme="dark" position="bottom-center" richColors />
    </div>
  );
}

const learnTopics = [
  {
    icon: Leaf,
    title: "What is alum?",
    copy: "Learn what alum is, where it comes from and how it fits into a daily body-care ritual.",
  },
  {
    icon: Droplets,
    title: "The alum ritual",
    copy: "Explore the format and understand where it may fit into your personal-care routine.",
  },
  {
    icon: ShieldCheck,
    title: "How to use alum",
    copy: "A clear step-by-step guide to preparing, applying and storing an alum block.",
  },
  {
    icon: BookOpen,
    title: "What is Miswak?",
    copy: "Discover the origins of Miswak and its long history as an oral-care stick.",
  },
  {
    icon: Smile,
    title: "The Miswak ritual",
    copy: "Understand the format before deciding if this time-tested ritual fits your routine.",
  },
  {
    icon: Calendar,
    title: "How to use Miswak",
    copy: "Learn how to prepare, brush, trim and store Miswak with simple visual steps.",
  },
];

function LearnPage({
  cart,
  menu,
  setMenu,
}: {
  cart: number;
  menu: boolean;
  setMenu: (value: boolean) => void;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const questions = [
    "How do I prepare an alum block?",
    "Can alum be used after shaving?",
    "How often should I trim Miswak?",
    "How should I store Miswak sticks?",
    "Where can I find approved product details?",
  ];
  return (
    <div className="site-shell learn-page">
      <header className="nav learn-nav">
        <a className="logo" href="/" aria-label="Hygiene Shark home">
          <img src="/assets/hygiene-shark-wordmark.png" alt="Hygiene Shark" />
        </a>
        <nav className={menu ? "open" : ""}>
          <a href="/shop">Shop</a>
          <a className="active" href="/learn">
            Learn
          </a>
          <a href="/story">Our Story</a>
        </nav>
        <div className="nav-actions">
          <button
            aria-label="Search"
            onClick={() =>
              toast("Search will connect when the content library is finalized")
            }
          >
            <Search />
          </button>
          <button className="cart" aria-label={`Cart with ${cart} items`}>
            <ShoppingBag />
            <span>{cart}</span>
          </button>
          <button
            className="menu"
            aria-label="Toggle menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section className="learn-hero">
          <div>
            <p className="eyebrow">Learn the rituals.</p>
            <h1>
              Alum & Miswak.
              <br />
              Time-tested. <em>Purposeful.</em>
            </h1>
            <p>
              Overlooked essentials, clearly explained and made easier to build
              into modern life.
            </p>
          </div>
        </section>
        <section className="rituals">
          <header>
            <h2>Two rituals. One standard.</h2>
            <p>
              Alum for body care. Miswak for oral care.
              <br />
              Simple, clear and easy to explore.
            </p>
          </header>
          <div className="ritual-grid">
            <article className="ritual-card alum-ritual-card">
              <div>
                <p className="eyebrow">Alum body care</p>
                <h3>Alum</h3>
                <strong>A focused body-care ritual.</strong>
                <p>
                  Meet the mineral-based block, understand the format and learn
                  the essentials before use.
                </p>
                <a href="#knowledge">
                  Learn more <ArrowRight />
                </a>
              </div>
            </article>
            <article className="ritual-card miswak-ritual-card">
              <div>
                <p className="eyebrow">Miswak oral care</p>
                <h3>Miswak</h3>
                <strong>A time-tested oral-care stick.</strong>
                <p>
                  Explore its origins and learn how to prepare, use, trim and
                  store it correctly.
                </p>
                <a href="#knowledge">
                  Learn more <ArrowRight />
                </a>
              </div>
            </article>
          </div>
        </section>
        <section className="knowledge" id="knowledge">
          <header>
            <h2>Deeper knowledge.</h2>
            <p>Everything you need to know about alum and Miswak.</p>
          </header>
          <div>
            {learnTopics.map(({ icon: Icon, title, copy }) => (
              <article key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{copy}</p>
                <button
                  onClick={() =>
                    toast(`${title} article is the next content build step`)
                  }
                >
                  Read more <ArrowRight />
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className="common-questions">
          <header>
            <h2>Common questions.</h2>
            <p>Quick answers to practical questions.</p>
          </header>
          <div className="question-layout">
            <div>
              {questions.map((q, i) => (
                <article key={q}>
                  <button onClick={() => setOpen(open === i ? null : i)}>
                    <span>{q}</span>
                    {open === i ? <Minus /> : <Plus />}
                  </button>
                  {open === i && (
                    <p>
                      We’ll publish the precise answer with approved
                      instructions and verified product information before
                      launch.
                    </p>
                  )}
                </article>
              ))}
            </div>
            <aside>
              <CircleHelp />
              <h3>Still have questions?</h3>
              <p>We’re here to help you choose what fits your routine.</p>
              <button
                onClick={() => toast("Contact form will connect before launch")}
              >
                Contact us
              </button>
            </aside>
          </div>
        </section>
      </main>
      <footer>
        <div>
          <img src="/assets/hygiene-shark-wordmark.png" alt="Hygiene Shark" />
          <p>
            Time-tested hygiene essentials,
            <br />
            rebuilt for modern life.
          </p>
        </div>
        <div>
          <b>Shop</b>
          <a href="/shop">All products</a>
          <a href="/shop">Alum body care</a>
          <a href="/shop">Miswak oral care</a>
        </div>
        <div>
          <b>Learn</b>
          <a href="/learn">The rituals</a>
          <a href="/#story">Our story</a>
          <a href="/#top">FAQs</a>
        </div>
        <div className="signoff">
          <span>Ready is a ritual.</span>
          <strong>Forever Prepped.</strong>
        </div>
      </footer>
      <Toaster theme="dark" position="bottom-center" richColors />
    </div>
  );
}

const storySteps = [
  {
    label: "01",
    title: "The rituals",
    copy: "Miswak was part of childhood. Alum proved its place through years of everyday use.",
  },
  {
    label: "02",
    title: "The realization",
    copy: "These trusted formats worked quietly, yet remained overlooked and poorly explained.",
  },
  {
    label: "03",
    title: "The decision",
    copy: "Four friends across India and Dubai chose to rebuild the experience around clarity and confidence.",
  },
  {
    label: "04",
    title: "The mission",
    copy: "Make time-tested hygiene simple to learn, easy to choose and ready for modern routines.",
  },
];

function StoryPage({
  cart,
  menu,
  setMenu,
}: {
  cart: number;
  menu: boolean;
  setMenu: (value: boolean) => void;
}) {
  return (
    <div className="site-shell story-page">
      <header className="nav story-nav">
        <a className="logo" href="/" aria-label="Hygiene Shark home">
          <img src="/assets/hygiene-shark-wordmark.png" alt="Hygiene Shark" />
        </a>
        <nav className={menu ? "open" : ""}>
          <a href="/shop">Shop</a>
          <a href="/learn">Learn</a>
          <a className="active" href="/story">
            Our Story
          </a>
        </nav>
        <div className="nav-actions">
          <button
            aria-label="Search"
            onClick={() =>
              toast("Search will connect when the site content is finalized")
            }
          >
            <Search />
          </button>
          <button className="cart" aria-label={`Cart with ${cart} items`}>
            <ShoppingBag />
            <span>{cart}</span>
          </button>
          <button
            className="menu"
            aria-label="Toggle menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section className="story-hero">
          <div>
            <p className="eyebrow">Our story.</p>
            <h1>
              Rooted in real rituals.
              <br />
              <em>Rebuilt for modern life.</em>
            </h1>
            <p>
              Hygiene Shark began with a simple realization: some of the most
              useful daily rituals were also the most overlooked.
            </p>
          </div>
        </section>
        <section className="story-origin">
          <div
            className="origin-image"
            role="img"
            aria-label="Miswak sticks in a natural setting"
          />
          <div>
            <p className="eyebrow">Where it started.</p>
            <h2>
              Four friends.
              <br />
              Two trusted traditions.
            </h2>
            <p>
              One of us grew up using Miswak and saw its place in a consistent
              oral-care routine. Another had relied on alum after shaving for a
              decade. We had also seen alum become a trusted answer in a
              friend’s daily body-care routine over five years.
            </p>
            <p>
              Those were not marketing stories. They were ordinary experiences
              that stayed with us—proof that simple formats can earn lasting
              trust when they fit naturally into life.
            </p>
          </div>
        </section>
        <section className="story-realization">
          <div>
            <p className="eyebrow">The turning point.</p>
            <h2>
              The essentials were there.
              <br />
              The experience was missing.
            </h2>
            <p>
              Across India and Dubai, we kept returning to the same question:
              why were time-tested hygiene formats still difficult to
              understand, inconsistently presented and easy to overlook?
            </p>
            <p>
              We did not want to invent another complicated routine. We wanted
              to make useful rituals clearer, bolder and easier to choose. That
              decision became Hygiene Shark.
            </p>
          </div>
          <div
            className="realization-image"
            role="img"
            aria-label="Hygiene Shark alum and Miswak products"
          />
        </section>
        <section className="story-path">
          <header>
            <p className="eyebrow">How we got here.</p>
            <h2>
              From lived experience
              <br />
              to a shared mission.
            </h2>
          </header>
          <div>
            {storySteps.map(step => (
              <article key={step.label}>
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="story-belief">
          <header>
            <p className="eyebrow">What guides us.</p>
            <h2>Simple. Clear. Purposeful.</h2>
          </header>
          <div>
            <article>
              <BookOpen />
              <h3>Teach before selling</h3>
              <p>
                Unfamiliar products deserve straightforward explanations and
                practical guidance.
              </p>
            </article>
            <article>
              <Sparkles />
              <h3>Make the ritual inviting</h3>
              <p>
                Strong design can help overlooked essentials feel relevant
                without losing their roots.
              </p>
            </article>
            <article>
              <ShieldCheck />
              <h3>Earn trust carefully</h3>
              <p>
                We choose clarity over exaggerated promises and verify product
                claims before publishing them.
              </p>
            </article>
          </div>
        </section>
        <section className="story-promise">
          <img src="/assets/hygiene-shark-symbol.png" alt="" />
          <div>
            <p className="eyebrow">Our promise.</p>
            <h2>
              Confidence should begin
              <br />
              before the moment arrives.
            </h2>
            <p>
              We are building Hygiene Shark for the person who wants fewer
              complications and more readiness: focused essentials, clear
              education and a buying experience that respects their time.
            </p>
            <a className="btn primary" href="/shop">
              Shop the essentials <ArrowRight />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <div>
          <img src="/assets/hygiene-shark-wordmark.png" alt="Hygiene Shark" />
          <p>
            Time-tested hygiene essentials,
            <br />
            rebuilt for modern life.
          </p>
        </div>
        <div>
          <b>Shop</b>
          <a href="/shop">All products</a>
          <a href="/shop">Alum body care</a>
          <a href="/shop">Miswak oral care</a>
        </div>
        <div>
          <b>Learn</b>
          <a href="/learn">The rituals</a>
          <a href="/story">Our story</a>
          <a href="/#top">FAQs</a>
        </div>
        <div className="signoff">
          <span>Ready is a ritual.</span>
          <strong>Forever Prepped.</strong>
        </div>
      </footer>
      <Toaster theme="dark" position="bottom-center" richColors />
    </div>
  );
}
function App() {
  const [menu, setMenu] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("hs-cart-items") || "[]");
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });
  const cart = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    document.title = "Hygiene Shark — Forever Prepped.";
  }, []);
  const add = (p: Product) => {
    setCartItems(current => {
      const found = current.find(item => item.slug === p.slug);
      const next = found
        ? current.map(item =>
            item.slug === p.slug
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...current, { slug: p.slug, quantity: 1 }];
      localStorage.setItem("hs-cart-items", JSON.stringify(next));
      return next;
    });
    toast.success(`${p.name} added to your cart`);
  };
  const path = window.location.pathname;
  const product = products.find(p => path === `/products/${p.slug}`);
  if (product)
    return (
      <ProductPage
        product={product}
        cart={cart}
        add={add}
        menu={menu}
        setMenu={setMenu}
      />
    );
  if (path === "/cart")
    return (
      <CartPage
        items={cartItems}
        setItems={items => {
          setCartItems(items);
          localStorage.setItem("hs-cart-items", JSON.stringify(items));
        }}
        menu={menu}
        setMenu={setMenu}
      />
    );
  if (pageContent[path])
    return <InfoPage path={path} cart={cart} menu={menu} setMenu={setMenu} />;
  if (window.location.pathname === "/shop") {
    return <ShopPage cart={cart} add={add} menu={menu} setMenu={setMenu} />;
  }
  if (window.location.pathname === "/learn") {
    return <LearnPage cart={cart} menu={menu} setMenu={setMenu} />;
  }
  if (window.location.pathname === "/story") {
    return <StoryPage cart={cart} menu={menu} setMenu={setMenu} />;
  }
  if (path !== "/")
    return (
      <div className="site-shell core-page">
        <SiteHeader cart={cart} menu={menu} setMenu={setMenu} />
        <main className="info-page">
          <p className="eyebrow">404.</p>
          <h1>That page swam away.</h1>
          <h2>Let’s get you back to the essentials.</h2>
          <a className="btn primary" href="/shop">
            Shop Hygiene Shark <ArrowRight />
          </a>
        </main>
        <SiteFooter />
      </div>
    );
  return (
    <div className="site-shell">
      <header className="nav">
        <a className="logo" href="#top" aria-label="Hygiene Shark home">
          <img src="/assets/hygiene-shark-wordmark.png" alt="Hygiene Shark" />
        </a>
        <nav className={menu ? "open" : ""} aria-label="Main navigation">
          <a href="/shop">Shop</a>
          <a href="/learn">Learn</a>
          <a href="/story">Our Story</a>
        </nav>
        <div className="nav-actions">
          <button
            aria-label="Search"
            onClick={() =>
              toast("Search will connect when the catalog is finalized")
            }
          >
            <Search />
          </button>
          <button
            className="cart"
            aria-label={`Cart with ${cart} items`}
            onClick={() =>
              toast(`${cart} item${cart === 1 ? "" : "s"} in your cart`)
            }
          >
            <ShoppingBag />
            <span>{cart}</span>
          </button>
          <button
            className="menu"
            aria-label="Toggle menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="top">
        <section className="hero">
          <div className="water-lines" />
          <div className="hero-copy">
            <p className="eyebrow">Time-tested hygiene.</p>
            <h1>
              Rebuilt for
              <br />
              <em>modern life.</em>
            </h1>
            <p className="lede">
              Overlooked daily essentials, made clearer, bolder and easier to
              build into your routine.
            </p>
            <div className="button-row">
              <a className="btn primary" href="/shop">
                Shop the essentials <ArrowRight />
              </a>
              <a className="btn ghost" href="#learn">
                Explore the ritual <ArrowRight />
              </a>
            </div>
            <p className="micro">Four products · Two purposeful rituals</p>
          </div>
        </section>
        <section className="section category-section" id="shop">
          <div className="section-head">
            <div>
              <p className="eyebrow">Care that fits your routine.</p>
              <h2>Start simple.</h2>
            </div>
            <p>Two categories. Four focused products. No overloaded shelves.</p>
          </div>
          <div className="category-grid">
            <article className="category-card dark-card">
              <div>
                <p className="index">01 / Body care</p>
                <h3>
                  Alum
                  <br />
                  Body Care
                </h3>
                <p>
                  A mineral-based block presented as a straightforward modern
                  ritual.
                </p>
                <a href="#products">
                  Shop alum <ArrowRight />
                </a>
              </div>
            </article>
            <article className="category-card sand-card">
              <div>
                <p className="index">02 / Oral care</p>
                <h3>
                  Miswak
                  <br />
                  Oral Care
                </h3>
                <p>
                  Ancient oral care. Modern performance. Available in 3- and
                  6-piece packs.
                </p>
                <a href="#products">
                  Shop Miswak <ArrowRight />
                </a>
              </div>
            </article>
          </div>
        </section>
        <section className="section learn" id="learn">
          <div className="learn-title">
            <p className="eyebrow">Know the essentials.</p>
            <h2>
              What is it?
              <br />
              Why use it?
              <br />
              How do I use it?
            </h2>
            <p>Short answers. Clear steps. No jargon.</p>
          </div>
          <article>
            <img
              className="texture"
              src="/assets/alum-ritual.png"
              alt="Alum block with aloe and water"
            />
            <div>
              <span>01</span>
              <h3>Alum</h3>
              <p>
                Meet the format, understand the routine and see exactly how it
                fits into the day.
              </p>
              <button
                onClick={() =>
                  toast("Alum education page is the next build step")
                }
              >
                Learn alum <ArrowRight />
              </button>
            </div>
          </article>
          <article>
            <img
              className="texture"
              src="/assets/miswak-ritual.png"
              alt="Prepared Miswak sticks"
            />
            <div>
              <span>02</span>
              <h3>Miswak</h3>
              <p>
                Learn how to prepare, brush, trim and store this time-tested
                oral-care stick.
              </p>
              <button
                onClick={() =>
                  toast("Miswak education page is the next build step")
                }
              >
                Learn Miswak <ArrowRight />
              </button>
            </div>
          </article>
        </section>
        <section className="section products" id="products">
          <div className="section-head">
            <div>
              <p className="eyebrow">The complete starting line.</p>
              <h2>Four essentials.</h2>
            </div>
            <p>
              Explore each format and choose the pack that fits your routine.
            </p>
          </div>
          <div className="product-grid">
            {products.map(p => (
              <article className="product-card" key={`${p.name}-${p.pack}`}>
                <ProductVisual product={p} />
                <p className="category-label">{p.category}</p>
                <h3>{p.name}</h3>
                <p className="pack">{p.pack}</p>
                <p className="note">{p.note}</p>
                <button onClick={() => add(p)}>
                  Add to cart <Plus />
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className="story" id="story">
          <div className="story-mark">
            <img src="/assets/hygiene-shark-symbol.png" alt="" />
          </div>
          <div className="story-copy">
            <p className="eyebrow">Born from real rituals.</p>
            <h2>
              Four founders.
              <br />
              One clear purpose.
            </h2>
            <p>
              From Mouddin’s childhood Miswak routine to Bilal’s decade with
              alum, Hygiene Shark began with essentials our founders already
              knew—then rebuilt the experience for modern life.
            </p>
            <a className="btn primary" href="#founders">
              Meet the founders <ArrowRight />
            </a>
          </div>
          <div className="founders" id="founders">
            <div>
              <b>Mouddin Khan</b>
              <span>21 · Miswak ritual</span>
            </div>
            <div>
              <b>Mohammad Ali</b>
              <span>22 · Co-founder</span>
            </div>
            <div>
              <b>Saad Khan</b>
              <span>24 · Co-founder</span>
            </div>
            <div>
              <b>Bilal Khan</b>
              <span>33 · Alum ritual</span>
            </div>
          </div>
        </section>
        <section className="section principles">
          <div>
            <p className="eyebrow">The Hygiene Shark standard.</p>
            <h2>
              Clean.
              <br />
              Confident.
              <br />
              <em>Ready.</em>
            </h2>
          </div>
          <div className="principle-grid">
            <article>
              <Check />
              <h3>Purposeful</h3>
              <p>Focused essentials with a clear role in the routine.</p>
            </article>
            <article>
              <Check />
              <h3>Easy to learn</h3>
              <p>Visual education makes unfamiliar formats approachable.</p>
            </article>
            <article>
              <Check />
              <h3>Built for life</h3>
              <p>Simple formats for home, gym bags and travel.</p>
            </article>
          </div>
        </section>
        <section className="section faq">
          <p className="eyebrow">The basics.</p>
          <h2>Questions, answered.</h2>
          {[
            "What is an alum block?",
            "What is Miswak?",
            "How will shipping and checkout work?",
          ].map((q, i) => (
            <div className="faq-row" key={q}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span>{q}</span>
                {openFaq === i ? <Minus /> : <Plus />}
              </button>
              {openFaq === i && (
                <p>
                  {i === 0
                    ? "A mineral-based block used as part of a personal-care ritual. The final product page will show the precise use instructions and approved claims."
                    : i === 1
                      ? "Miswak is a natural oral-care stick from the Salvadora persica tree. We’ll teach preparation, brushing, trimming and storage visually."
                      : "This preview demonstrates the storefront experience. Payments, shipping rules and live inventory will be selected before the Hostinger production launch."}
                </p>
              )}
            </div>
          ))}
        </section>
      </main>
      <footer>
        <div>
          <img src="/assets/hygiene-shark-wordmark.png" alt="Hygiene Shark" />
          <p>
            Time-tested hygiene essentials,
            <br />
            rebuilt for modern life.
          </p>
        </div>
        <div>
          <b>Shop</b>
          <a href="#products">All products</a>
          <a href="#shop">Alum body care</a>
          <a href="#shop">Miswak oral care</a>
        </div>
        <div>
          <b>Learn</b>
          <a href="#learn">The rituals</a>
          <a href="#story">Our story</a>
          <a href="#top">FAQs</a>
        </div>
        <div className="signoff">
          <span>Ready is a ritual.</span>
          <strong>Forever Prepped.</strong>
        </div>
      </footer>
      <Toaster theme="dark" position="bottom-center" richColors />
    </div>
  );
}
export default App;
