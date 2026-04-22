import PortfolioLayout from './PortfolioLayout';
import SEOLayout from './SEOLayout';
import EcommerceLayout from './EcommerceLayout';
import UXLayout from './UXLayout';
import AIChatBotLayout from './AIChatBotLayout';
import SocialMediaLayout from './SocialMediaLayout';
import PipelineStages from '../../app/services/[slug]/PipelineStages';

const layouts: Record<string, any> = {
  portfolio: PortfolioLayout,
  seo: SEOLayout,
  ecommerce: EcommerceLayout,
  ux: UXLayout,
  ai: AIChatBotLayout,
  social: SocialMediaLayout,
  ghl: PipelineStages,
};

export default layouts;
