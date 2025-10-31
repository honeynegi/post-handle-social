'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FlowStep } from '../data/flowConfig'

interface ProcessStepProps {
  step: FlowStep
  index: number
  isLast: boolean
}

export default function ProcessStep({ step, index, isLast }: ProcessStepProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="relative"
    >
      {/* Connecting Line */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          className="absolute left-8 top-24 w-1 h-12 bg-gradient-to-b from-custom-secondary to-transparent origin-top"
        />
      )}

      {/* Step Card */}
      <div className="pl-28 pb-8">
        <motion.div
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-6 cursor-pointer hover:shadow-lg hover:border-custom-secondary transition-all"
          whileHover={{ x: 4 }}
        >
          {/* Step Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{step.icon}</span>
                <div>
                  <h4 className="text-lg font-bold text-custom-primary dark:text-custom-secondary">
                    Step {index + 1}: {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 ml-4"
            >
              <svg
                className="w-6 h-6 text-custom-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </div>

          {/* Expandable Details */}
          <motion.div
            variants={detailsVariants}
            initial="hidden"
            animate={isExpanded ? 'visible' : 'hidden'}
            className="overflow-hidden"
          >
            {step.details && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  Process Details:
                </h5>
                <ul className="space-y-3">
                  {step.details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-custom-secondary/20 flex items-center justify-center mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-custom-secondary" />
                      </span>
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
