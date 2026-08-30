import React, { useState } from 'react';
import { Layers, Server, Database, Bell, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ArchitectureNode } from '../types';

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ nodes }) => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);

  const getLayerIcon = (layer: string) => {
    switch (layer) {
      case 'Client Layer': return <Layers className="w-4 h-4" style={{ color: 'var(--accent-main)' }} />;
      case 'Logic & Booking Engine': return <Server className="w-4 h-4" style={{ color: 'var(--accent-main)' }} />;
      case 'Data & Integrations': return <Database className="w-4 h-4" style={{ color: 'var(--accent-main)' }} />;
      case 'Notifications & Operations': return <Bell className="w-4 h-4" style={{ color: 'var(--accent-main)' }} />;
      default: return <Server className="w-4 h-4" style={{ color: 'var(--accent-main)' }} />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* High-Level Visual Pipeline */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--accent-main)' }}>
              System Architecture Flow
            </p>
            <h4 className="text-base font-bold text-stone-900 font-syne">
              End-to-End Reservation & Concurrency Pipeline
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-stone-100 border border-stone-200 text-stone-600">
            Interactive Topology
          </span>
        </div>

        {/* 4 Pipeline Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
          {nodes.map((node, idx) => {
            const isSelected = selectedLayerIndex === idx;
            return (
              <div
                key={node.title}
                onClick={() => setSelectedLayerIndex(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'border-stone-800 shadow-md scale-[1.02]'
                    : 'bg-stone-50 border-stone-200 hover:border-stone-400 hover:bg-white'
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: 'var(--accent-soft)',
                        borderColor: 'var(--accent-soft-border)',
                      }
                    : {}
                }
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-white border border-stone-200 shadow-xs">
                    {getLayerIcon(node.layer)}
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] font-mono uppercase font-semibold" style={{ color: 'var(--accent-main)' }}>
                    {node.layer}
                  </p>
                  <p className="text-xs font-bold text-stone-900 font-syne">
                    {node.title}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-2 border-t border-stone-200/60">
                  {node.components.slice(0, 2).map((comp) => (
                    <span
                      key={comp}
                      className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-stone-600 border border-stone-200"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Layer Deep Dive */}
      {nodes[selectedLayerIndex] && (
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row gap-6 items-start justify-between">
          <div className="space-y-2 md:max-w-md">
            <div className="flex items-center gap-2">
              <span 
                className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold border"
                style={{ 
                  backgroundColor: 'var(--accent-soft)', 
                  borderColor: 'var(--accent-soft-border)',
                  color: 'var(--accent-soft-text)'
                }}
              >
                {nodes[selectedLayerIndex].layer}
              </span>
              <h5 className="text-lg font-bold text-stone-900 font-syne">
                {nodes[selectedLayerIndex].title}
              </h5>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              {nodes[selectedLayerIndex].description}
            </p>
          </div>

          <div className="w-full md:w-auto space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 font-bold block">
              Integrated Modules & Tech:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {nodes[selectedLayerIndex].components.map((comp) => (
                <span
                  key={comp}
                  className="px-3 py-1 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono font-semibold text-stone-800"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
