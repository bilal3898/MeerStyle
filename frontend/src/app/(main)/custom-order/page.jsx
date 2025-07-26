// src/app/(main)/custom-order/page.jsx
import { useCart } from '@/contexts/hooks/useCart';
import MeasurementVisualizer from '@/components/measurement/3DScanner';
import { calculateFabric } from '@/lib/domain/fabric/calculator';
import { createOrder } from '@/services/order.service';
import FabricCard from '@/components/fabric/FabricCard';