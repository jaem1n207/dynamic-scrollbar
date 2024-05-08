import { siteConfig } from '~/shared/const/site';
import { Button, Link, Tooltip, TooltipContent, TooltipTrigger } from '~/shared/ui';
import { Paragraph } from '~/shared/ui/typography';
import IconSeal from '~icons/fluent-emoji/seal';
import IconTextDocumentEdit from '~icons/fluent-mdl2/text-document-edit';
import IconBookOpenOutline from '~icons/mdi/book-open-blank-variant-outline';
import IconGitIssue from '~icons/mdi/git-issue';
import IconGithub from '~icons/mdi/github';

const MainNav = () => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <Link
            external
            variant="primary"
            href={siteConfig.links.github.repo}
            className="mr-6 space-x-2"
            prefixEl={<IconSeal className="size-6" />}
          >
            <Paragraph asChild size="lg" className="hidden sm:inline-block">
              <span>Dynamic Scrollbar</span>
            </Paragraph>
          </Link>
        </TooltipTrigger>
        <TooltipContent>View on GitHub</TooltipContent>
      </Tooltip>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Tooltip>
          <TooltipTrigger>
            <Link
              external
              href={siteConfig.links.github.readme}
              prefixEl={<IconBookOpenOutline className="size-4" />}
            >
              <span>Documentation</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Learn more about Dynamic Scrollbar</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Link
              external
              href={siteConfig.links.github.issues}
              prefixEl={<IconGitIssue className="size-4" />}
            >
              <span>Report Issue</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Report an issue on GitHub</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Link
              disabled
              href={siteConfig.links.github.changeLog}
              prefixEl={<IconTextDocumentEdit className="size-4" />}
            >
              <span>Changelog</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View the changelog</TooltipContent>
        </Tooltip>
      </nav>
    </>
  );
};

export const OptionsHeader = () => {
  return (
    <header
      className="sticky top-0 z-header w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      border="1 border/40"
    >
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(siteConfig.links.github.repo)}
            >
              <IconGithub className="size-5" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
