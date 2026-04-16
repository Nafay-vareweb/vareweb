import PortfolioLayout from './PortfolioLayout';
import SEOLayout from './SEOLayout';
import EcommerceLayout from './EcommerceLayout';
import UXLayout from './UXLayout';
import AIChatBotLayout from './AIChatBotLayout';
import PipelineStages from '../../app/services/[slug]/PipelineStages';

const layouts: Record<string, any> = {
  portfolio: PortfolioLayout,
  seo: SEOLayout,
  ecommerce: EcommerceLayout,
  ux: UXLayout,
  ai: AIChatBotLayout,
  ghl: PipelineStages,
};

export default layouts;
