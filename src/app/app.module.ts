import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StorageServiceModule } from 'angular-webstorage-service';

// pipes
import { FilterPipe } from './_pipes/filter.pipe';
import { FilterMultiPipe } from './_pipes/filter-multi.pipe';

import { AppComponent } from './app.component';
import { LessonService } from './_services/lesson.service';
import { HomeComponent } from './home/home.component';
import { LessonComponent } from './lesson/lesson.component';
import { HeaderComponent } from './header/header.component';
import { LessonColorsComponent } from './lesson/lesson-custom/lesson-colors/lesson-colors.component';
import { LessonIconFontComponent } from './lesson/lesson-icon-font/lesson-icon-font.component';
import { ConfigExamComponent } from './config-exam/config-exam.component';
import { ExamComponent } from './exam/exam.component';
import { ScoreComponent } from './score/score.component';
import { GraphicsTextComponent } from './lesson/graphics-text/graphics-text.component';
import { LessonVocabularyComponent } from './lesson/lesson-vocabulary/lesson-vocabulary.component';
import { LessonImagesComponent } from './lesson/lesson-images/lesson-images.component';
import { LessonVerbComponent } from './lesson/lesson-verb/lesson-verb.component';
import { PaginationComponent } from './pagination/pagination.component';

import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { TableComponent } from './table/table.component';
import { CreditsComponent } from './credits/credits.component';
import { ListeningInfoComponent } from './listening-info/listening-info.component';
import { LessonPronounsComponent } from './lesson/lesson-custom/lesson-pronouns/lesson-pronouns.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    FilterMultiPipe,
    HomeComponent,
    LessonComponent,
    HeaderComponent,
    LessonColorsComponent,
    LessonIconFontComponent,
    ConfigExamComponent,
    ExamComponent,
    ScoreComponent,
    GraphicsTextComponent,
    LessonVocabularyComponent,
    LessonImagesComponent,
    LessonVerbComponent,
    PaginationComponent,
    LoaderComponent,
    TableComponent,
    CreditsComponent,
    ListeningInfoComponent,
    LessonPronounsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StorageServiceModule
  ],
  providers: [LessonService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
