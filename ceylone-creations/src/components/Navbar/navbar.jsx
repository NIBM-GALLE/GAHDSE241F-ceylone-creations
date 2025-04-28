import { Link } from 'react-router-dom';
import { ShoppingCart, Person } from '@material-ui/icons';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center text-indigo-600">
          <span className="text-2xl font-bold">HandmadeFund</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="font-medium hover:text-indigo-600">Discover</Link>
          <Link to="/how-it-works" className="font-medium hover:text-indigo-600">How It Works</Link>
          <Link to="/create" className="font-medium hover:text-indigo-600">Start a Campaign</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-indigo-600">
            <ShoppingCart />
          </button>
          <button className="p-2 text-gray-600 hover:text-indigo-600">
            <Person />
          </button>
        </div>
      </div>
    </header>
  );
}