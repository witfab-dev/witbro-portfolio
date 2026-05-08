// components/shared/ThreeJSErrorBoundary.jsx
import React from 'react';

export default class ThreeJSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Three.js component error:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-950" />
      );
    }

    return this.props.children;
  }
}
