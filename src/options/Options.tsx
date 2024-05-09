import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui';
import { Title } from '~/shared/ui/typography';
import { OptionsHeader } from '~/widgets/header';
import { ThemeCustomizer } from '~/widgets/theme';

export const Options = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-base">
      <OptionsHeader />
      <main className="flex-1">
        <div className="container relative">
          <section className="mx-auto py-2 max-w-screen-lg flex flex-col items-center gap-2 md:pb-8 lg:pb-20">
            <Title size="h1" className="text-center">
              Dynamic Scrollbar Options
            </Title>
          </section>
          <Tabs defaultValue="theme">
            <TabsList>
              <TabsTrigger value="theme">theme</TabsTrigger>
              <TabsTrigger disabled value="applications">
                applications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="theme" className="max-w-lg">
              <ThemeCustomizer />
            </TabsContent>
            <TabsContent value="applications">Hello Applcation!</TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
