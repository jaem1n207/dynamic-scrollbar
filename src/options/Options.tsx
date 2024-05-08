import { AppearanceSwitch } from '~/features/theme';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui';
import { Title } from '~/shared/ui/typography';
import { OptionsHeader } from '~/widgets/header';
import { ThemeCustomizer } from '~/widgets/theme';

const Options = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <OptionsHeader />
      <main className="flex-1">
        <div className="container relative">
          <section className="mx-auto py-2 max-w-screen-lg flex flex-col items-center gap-2 md:pb-8 lg:pb-20">
            <Title size="h1" className="text-center">
              Dynamic Scrollbar Options
            </Title>
          </section>
        </div>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <>
              <ThemeCustomizer />
              <AppearanceSwitch />
            </>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Options;
