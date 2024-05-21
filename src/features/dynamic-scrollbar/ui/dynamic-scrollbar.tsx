import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { usePrefersReducedMotion } from '~/shared/use';
import IconCat from '~icons/arcticons/cats-and-soup';

type View = 'Expanded' | 'CompactLeading' | 'CompactTrailing' | 'Minimal';

const show = {
  opacity: 1,
  filter: 'blur(0px)',
};

const exit = {
  opacity: 0,
  filter: 'blur(4px)',
};

export const DynamicScrollbar = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [elementRef, bounds] = useMeasure();
  const constraintsRef = useRef(null);

  const NormalContent = () => {
    return (
      <motion.div
        layout
        initial={exit}
        animate={showExtraContent ? exit : show}
        className="flex gap-2 items-center"
      >
        <IconCat />
        <span>Hello! This is a cat.</span>
      </motion.div>
    );
  };

  const ExtraContent = () => {
    return (
      <motion.div
        layout
        initial={exit}
        animate={showExtraContent ? show : exit}
        className="flex gap-2 items-center"
      >
        <IconCat />
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in semper nunc.</span>
      </motion.div>
    );
  };

  return (
    <div className="size-full" ref={constraintsRef}>
      <motion.button
        drag
        dragConstraints={constraintsRef}
        animate={prefersReducedMotion ? {} : { height: bounds.height, width: bounds.width }}
        onClick={() => setShowExtraContent((prev) => !prev)}
        className="bg-white rounded-4 flex flex-col gap-2"
      >
        <div ref={elementRef} className="px-2.5 text-primary">
          <div className="p-4 h-auto">
            {/* {showExtraContent ? <ExtraContent key="extra" /> : <NormalContent key="normal" />} */}
            <IconCat className="size-6" />
            <span>Hello! This is a cat.</span>
            {showExtraContent && (
              <motion.div
                layout
                initial={exit}
                animate={showExtraContent ? show : exit}
                className="flex gap-2 items-center"
              >
                <IconCat />
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in semper nunc.
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.button>
    </div>
  );
};
