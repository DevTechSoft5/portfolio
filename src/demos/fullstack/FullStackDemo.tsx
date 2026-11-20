import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  ShoppingCart, 
  User, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Trash2, 
  Check, 
  Search, 
  Filter, 
  DollarSign, 
  Package, 
  ArrowRight, 
  CreditCard, 
  Truck, 
  Layers, 
  BarChart2, 
  RotateCcw,
  Tag,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { DemoBanner } from '../../components/common/DemoBanner';

interface Product {
  id: string;
  name: string;
  category: 'Cloud Software' | 'Hardware' | 'Infrastructure' | 'Support';
  price: number;
  stock: number;
  description: string;
  badge?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  items: { productName: string; quantity: number; price: number }[];
  total: number;
  discount: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 'PROD-101', name: 'DevTech Cloud Core Enterprise Suite', category: 'Cloud Software', price: 2490.00, stock: 45, description: 'Unlimited seats, SAML SSO integration, and 24/7 dedicated engineering support.', badge: 'Bestseller' },
  { id: 'PROD-102', name: 'High-Density Rack Server Node (2U)', category: 'Hardware', price: 4850.00, stock: 12, description: 'Dual AMD EPYC 9654, 512GB DDR5, 8x 3.84TB NVMe SSDs with redundant PSUs.' },
  { id: 'PROD-103', name: 'Dedicated PySpark Lakehouse Cluster (1Mo)', category: 'Infrastructure', price: 1800.00, stock: 99, description: 'Pre-configured Apache Spark 3.5 runtime on managed Kubernetes with autoscaling.' },
  { id: 'PROD-104', name: 'Enterprise Architecture Sprint (2 Weeks)', category: 'Support', price: 7500.00, stock: 4, description: 'Direct architectural review and prototype build led by DevTechSoft senior architects.', badge: 'High Demand' },
  { id: 'PROD-105', name: 'Managed Kubernetes Edge Gateway Appliance', category: 'Hardware', price: 3200.00, stock: 3, description: 'Zero-trust edge router with wireguard hardware acceleration and dual 10GbE SFP+.' },
  { id: 'PROD-106', name: 'Compliance & SOC 2 Audit Automation Pack', category: 'Cloud Software', price: 1250.00, stock: 30, description: 'Automated evidence collector for AWS, Azure, Google Cloud, and GitHub repos.' }
];

const INITIAL_ORDERS: Order[] = [
  { id: 'ORD-9821', date: '2026-03-12 11:30', customerName: 'Apex Health Systems', customerEmail: 'ereed@apexhealth.org', items: [{ productName: 'DevTech Cloud Core Enterprise Suite', quantity: 1, price: 2490.00 }], total: 2241.00, discount: 249.00, status: 'Processing' },
  { id: 'ORD-9820', date: '2026-03-11 16:15', customerName: 'Strata Cloud Solutions', customerEmail: 'elena@stratacloud.io', items: [{ productName: 'High-Density Rack Server Node (2U)', quantity: 2, price: 4850.00 }], total: 9700.00, discount: 0, status: 'Shipped' },
];

export const FullStackDemo: React.FC = () => {
  // App Mode: 'customer' (storefront & cart) or 'admin' (business operations)
  const [roleMode, setRoleMode] = useState<'customer' | 'admin'>('customer');
  const [customerTab, setCustomerTab] = useState<'catalog' | 'orders'>('catalog');
  const [adminTab, setAdminTab] = useState<'products' | 'orders' | 'inventory' | 'sales'>('products');

  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('devtech_bizcore_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('devtech_bizcore_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('devtech_bizcore_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Selected Product for quick view
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Checkout form
  const [customerName, setCustomerName] = useState('Sarah Jenkins');
  const [customerEmail, setCustomerEmail] = useState('sarah.j@enterprise.com');
  const [shippingAddress, setShippingAddress] = useState('100 Technology Plaza, Suite 400, Austin, TX');

  // Filter
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Product Modal (Admin)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdData, setNewProdData] = useState({
    name: '',
    category: 'Cloud Software' as Product['category'],
    price: 999,
    stock: 20,
    description: ''
  });

  useEffect(() => {
    localStorage.setItem('devtech_bizcore_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('devtech_bizcore_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('devtech_bizcore_orders', JSON.stringify(orders));
  }, [orders]);

  const handleResetData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCart([]);
    setOrders(INITIAL_ORDERS);
    setDiscountPercent(0);
    setCouponCode('');
    localStorage.removeItem('devtech_bizcore_products');
    localStorage.removeItem('devtech_bizcore_cart');
    localStorage.removeItem('devtech_bizcore_orders');
  };

  // Add to Cart
  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      alert('This item is currently out of stock.');
      return;
    }
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'DEVTECH10') {
      setDiscountPercent(0.10);
      alert('Promo code applied! 10% discount deducted from subtotal.');
    } else {
      alert('Invalid promo code. (Try "DEVTECH10" for 10% off!)');
    }
  };

  // Subtotals
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = cartSubtotal * discountPercent;
  const cartTotal = cartSubtotal - discountAmount;
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Complete Order
  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${9800 + orders.length + 1}`,
      date: new Date().toLocaleString(),
      customerName,
      customerEmail,
      items: cart.map(i => ({ productName: i.product.name, quantity: i.quantity, price: i.product.price })),
      total: cartTotal,
      discount: discountAmount,
      status: 'Processing'
    };

    // Decrement stock
    setProducts(products.map(p => {
      const inCart = cart.find(i => i.product.id === p.id);
      if (inCart) {
        return { ...p, stock: Math.max(0, p.stock - inCart.quantity) };
      }
      return p;
    }));

    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCheckoutModalOpen(false);
    setIsCartOpen(false);
    alert(`Order ${newOrder.id} placed successfully! View it in the "My Orders" tab.`);
  };

  // Restock item
  const handleRestock = (productId: string) => {
    setProducts(products.map(p => p.id === productId ? { ...p, stock: p.stock + 25 } : p));
  };

  // Admin Add Product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdData.name) return;

    const newProd: Product = {
      id: `PROD-${100 + products.length + 1}`,
      ...newProdData
    };
    setProducts([newProd, ...products]);
    setIsAddProductOpen(false);
    setNewProdData({ name: '', category: 'Cloud Software', price: 999, stock: 20, description: '' });
  };

  // Filtered products
  const filteredProducts = products.filter(p => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Top Banner */}
      <DemoBanner 
        projectName="BizCore Commerce & Operations"
        projectSlug="business-management"
        category="Full-Stack Development"
        onResetData={handleResetData}
        resetLabel="Reset Storefront Database"
      />

      {/* App Header */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm shadow-md">
            BC
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>BizCore Unified Operations</span>
              <span className="text-[10px] bg-slate-800 text-blue-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                Full-Stack Architecture
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Stack: React 19 + Node/Express Contracts + Local DB
            </div>
          </div>
        </div>

        {/* Role Switcher Pill */}
        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setRoleMode('customer')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              roleMode === 'customer' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Storefront Customer
          </button>
          <button
            onClick={() => setRoleMode('admin')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              roleMode === 'admin' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Admin Management
          </button>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2 flex items-center justify-between shadow-2xs">
        {roleMode === 'customer' ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCustomerTab('catalog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                customerTab === 'catalog' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Enterprise Catalog
            </button>
            <button
              onClick={() => setCustomerTab('orders')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                customerTab === 'orders' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              My Placed Orders ({orders.length})
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            {[
              { id: 'products', label: 'Product Inventory' },
              { id: 'orders', label: `Orders (${orders.length})` },
              { id: 'inventory', label: 'Stock Alerts' },
              { id: 'sales', label: 'Sales Reports' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  adminTab === tab.id ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Right Cart Trigger (Customer Mode) */}
        {roleMode === 'customer' && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart ({cartItemCount})</span>
            {cartSubtotal > 0 && <span className="font-mono">${cartTotal.toFixed(0)}</span>}
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
        
        {/* CUSTOMER MODE */}
        {roleMode === 'customer' && (
          <>
            {customerTab === 'catalog' && (
              <div className="space-y-6">
                
                {/* Search & Filter */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search hardware, licenses, infrastructure..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="text-xs rounded-lg border border-slate-300 py-1.5 px-3 bg-white"
                    >
                      <option value="All">All Categories</option>
                      <option value="Cloud Software">Cloud Software</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(prod => (
                    <div key={prod.id} className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-[10px] font-mono font-medium text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                            {prod.category}
                          </span>
                          {prod.badge && (
                            <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-blue-200">
                              {prod.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-slate-900 mb-2">{prod.name}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                          {prod.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-slate-400">Unit Price</div>
                          <div className="text-xl font-extrabold text-slate-900 font-mono">
                            ${prod.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAddToCart(prod)}
                            disabled={prod.stock <= 0}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>{prod.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* Past Orders */}
            {customerTab === 'orders' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900">Your Placed Orders</h3>
                <div className="space-y-3">
                  {orders.map(order => (
                    <div key={order.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-blue-600">{order.id}</span>
                        <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200 text-[10px]">
                          {order.status}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px]">{order.date} &bull; Bill to: {order.customerName}</div>
                      <div className="space-y-1 pt-1">
                        {order.items.map((i, idx) => (
                          <div key={idx} className="flex justify-between text-slate-700">
                            <span>{i.productName} (x{i.quantity})</span>
                            <span className="font-mono font-medium">${(i.price * i.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                        <span>Total Paid</span>
                        <span className="font-mono text-sm">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ADMIN MODE */}
        {roleMode === 'admin' && (
          <div className="space-y-6">
            
            {/* TAB 1: PRODUCT INVENTORY */}
            {adminTab === 'products' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Product Catalog Management</h3>
                    <p className="text-xs text-slate-500">Edit prices, restock items, or publish new offerings</p>
                  </div>
                  <button
                    onClick={() => setIsAddProductOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Product</span>
                  </button>
                </div>

                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">SKU / ID</th>
                      <th className="py-3 px-4">Product Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock Level</th>
                      <th className="py-3 px-4 text-right">Quick Restock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono text-slate-500">{p.id}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                        <td className="py-3 px-4 text-slate-600">{p.category}</td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">${p.price.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.stock <= 5 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleRestock(p.id)}
                            className="text-blue-600 hover:text-blue-700 text-[11px] font-semibold bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded"
                          >
                            +25 Units
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Add Product Modal */}
                {isAddProductOpen && (
                  <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
                      <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                        Add New Catalog Product
                      </h3>
                      <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Product Name</label>
                          <input
                            type="text"
                            required
                            value={newProdData.name}
                            onChange={(e) => setNewProdData({ ...newProdData, name: e.target.value })}
                            placeholder="e.g. Dedicated GPU Cluster Node"
                            className="w-full p-2 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-slate-700 font-semibold mb-1">Category</label>
                            <select
                              value={newProdData.category}
                              onChange={(e) => setNewProdData({ ...newProdData, category: e.target.value as any })}
                              className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                            >
                              <option value="Cloud Software">Cloud Software</option>
                              <option value="Hardware">Hardware</option>
                              <option value="Infrastructure">Infrastructure</option>
                              <option value="Support">Support</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-slate-700 font-semibold mb-1">Price ($)</label>
                            <input
                              type="number"
                              required
                              value={newProdData.price}
                              onChange={(e) => setNewProdData({ ...newProdData, price: parseFloat(e.target.value) || 0 })}
                              className="w-full p-2 border border-slate-300 rounded-lg"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Initial Stock Units</label>
                          <input
                            type="number"
                            required
                            value={newProdData.stock}
                            onChange={(e) => setNewProdData({ ...newProdData, stock: parseInt(e.target.value, 10) || 0 })}
                            className="w-full p-2 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Description</label>
                          <textarea
                            rows={3}
                            value={newProdData.description}
                            onChange={(e) => setNewProdData({ ...newProdData, description: e.target.value })}
                            placeholder="Specification summary..."
                            className="w-full p-2 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => setIsAddProductOpen(false)}
                            className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-600"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm"
                          >
                            Save Product
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ORDERS (ADMIN) */}
            {adminTab === 'orders' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Commercial Order Registry</h3>
                <div className="space-y-3 text-xs">
                  {orders.map(o => (
                    <div key={o.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div>
                        <div className="font-mono font-bold text-blue-600">{o.id}</div>
                        <div className="text-slate-800 font-semibold">{o.customerName} ({o.customerEmail})</div>
                        <div className="text-slate-500 text-[11px]">{o.items.length} items &bull; Placed {o.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm font-extrabold text-slate-900">${o.total.toFixed(2)}</div>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: INVENTORY */}
            {adminTab === 'inventory' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Low Stock Warnings</h3>
                <div className="space-y-2 text-xs">
                  {products.filter(p => p.stock <= 10).map(p => (
                    <div key={p.id} className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span className="font-bold text-amber-900">{p.name}</span>
                        <span className="text-amber-700">({p.stock} units remaining)</span>
                      </div>
                      <button
                        onClick={() => handleRestock(p.id)}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-2.5 py-1 rounded"
                      >
                        Restock Now (+25)
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SALES */}
            {adminTab === 'sales' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Commercial Performance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-xs text-slate-500">Gross Sales Revenue</div>
                    <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                      ${orders.reduce((acc, o) => acc + o.total, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-xs text-slate-500">Total Fulfilled Orders</div>
                    <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{orders.length}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-xs text-slate-500">Average Order Value (AOV)</div>
                    <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                      ${(orders.reduce((acc, o) => acc + o.total, 0) / (orders.length || 1)).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Slide-over Shopping Cart Drawer */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex justify-end z-50">
            <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col p-6 animate-slideInRight">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">Shopping Cart ({cartItemCount})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">
                  &times;
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Your cart is currently empty.
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.product.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                      <div className="flex-1 mr-2">
                        <div className="font-bold text-slate-900">{item.product.name}</div>
                        <div className="text-slate-500 font-mono mt-0.5">${item.product.price.toFixed(2)} each</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleUpdateQuantity(item.product.id, -1)} className="p-1 rounded bg-white border border-slate-200">
                          <Minus className="w-3 h-3 text-slate-600" />
                        </button>
                        <span className="font-bold text-slate-900 font-mono">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.product.id, 1)} className="p-1 rounded bg-white border border-slate-200">
                          <Plus className="w-3 h-3 text-slate-600" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  {/* Coupon */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (try DEVTECH10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs uppercase"
                    />
                    <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                      Apply
                    </button>
                  </form>

                  {/* Summary */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-mono">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Discount (10%):</span>
                        <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-base text-slate-900 pt-1 border-t border-slate-100">
                      <span>Total:</span>
                      <span className="font-mono">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutModalOpen(true);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow-md text-xs flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Simulated Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                Confirm Simulated Enterprise Order
              </h3>

              <form onSubmit={handleCompleteOrder} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Company Contact Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Billing Email</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Corporate Billing &amp; Shipping Address</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Order Total:</span>
                    <span className="font-mono">${cartTotal.toFixed(2)} USD</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Payment Method: Corporate PO / Net 30 Terms (Simulated)</div>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                  <button type="button" onClick={() => setIsCheckoutModalOpen(false)} className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm">
                    Confirm Order &amp; Deduct Stock
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
