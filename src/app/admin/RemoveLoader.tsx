"use client"

import { useEffect } from 'react'

export default function RemoveLoader() {
  useEffect(() => {
    function removeIfLoader(el: Element) {
      try {
        const cls = (el as HTMLElement).className || ''
        const txt = (el as HTMLElement).innerText || ''
        if (typeof cls === 'string' && (cls.includes('fixed') && cls.includes('inset-0'))) {
          if (txt.includes('Loading content') || txt.includes('Digital Studio') || txt.match(/\d+%/)) {
            el.remove()
            return true
          }
        }
      } catch (e) {
        // ignore
      }
      return false
    }

    // Initial pass
    Array.from(document.querySelectorAll('div')).forEach((el) => removeIfLoader(el))

    // Observe and remove if inserted later
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of Array.from(m.addedNodes)) {
          if (node.nodeType === 1) {
            if (removeIfLoader(node as Element)) return
            Array.from((node as Element).querySelectorAll('div')).forEach((el) => removeIfLoader(el))
          }
        }
      }
    })

    obs.observe(document.body, { childList: true, subtree: true })
    return () => obs.disconnect()
  }, [])

  return null
}
