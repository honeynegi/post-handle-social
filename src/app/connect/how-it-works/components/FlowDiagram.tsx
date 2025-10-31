'use client'

import { motion } from 'framer-motion'
import ProcessStep from './ProcessStep'
import { PLATFORMS } from '../data/flowConfig'

interface FlowDiagramProps {
  platform: string
}

export default function FlowDiagram({ platform }: FlowDiagramProps) {
  const platformData = PLATFORMS[platform]

  if (!platformData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Platform not found</p>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={platform}
    >
      {/* Diagram Header with Timeline Visual */}
      <motion.div
        variants={headerVariants}
        className="mb-12 relative"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-custom-primary dark:text-white mb-2">
              Connection Flow Timeline
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Click on any step to see detailed information about what happens at each stage
            </p>
          </div>
        </div>

        {/* Visual Timeline Indicator */}
        <div className="bg-gradient-to-r from-custom-secondary/20 to-transparent rounded-lg p-4 flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-custom-secondary animate-pulse" />
            <span className="text-sm font-medium text-custom-secondary">
              {platformData.steps.length} steps total
            </span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-custom-secondary to-custom-secondary/50"
            />
          </div>
        </div>
      </motion.div>

      {/* Steps Container */}
      <div className="space-y-0">
        {platformData.steps.map((step, index) => (
          <ProcessStep
            key={step.id}
            step={step}
            index={index}
            isLast={index === platformData.steps.length - 1}
          />
        ))}
      </div>

      {/* Completion Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full px-6 py-3">
          <span className="text-2xl">✓</span>
          <span className="font-medium text-green-700 dark:text-green-400">
            Connection process complete!
          </span>
        </div>
      </motion.div>

      {/* Bottom Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
      >
        <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 How This Works in Practice
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-400 mb-4">
          When you click the connect button on our app:
        </p>
        <ol className="text-sm text-blue-800 dark:text-blue-400 space-y-2 list-decimal list-inside">
          <li>You're taken to {platformData.name}'s official login page</li>
          <li>You approve access to your account through their official OAuth flow</li>
          <li>You're redirected back to our app with a secure authorization code</li>
          <li>Our backend securely exchanges this code for access tokens</li>
          <li>We store these tokens encrypted in our database</li>
          <li>You can now manage your content through our platform</li>
        </ol>
      </motion.div>
    </motion.div>
  )
}
